'use client'
import {
    Row,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table'
import { useRouter } from 'next/navigation';
import { Product_db, Product, Products_db } from '../types/product';

  const columnHelper = createColumnHelper<Product>()
  const columns = [
        columnHelper.accessor('id', {
        header: 'Product ID'}),

      columnHelper.accessor('productName', {
          header: 'Item Name',
      }),
      columnHelper.accessor('price', {
          header: 'Price Per Item',
      }),
    ]

const Inventory = ({ products }: Products_db) => {
    const router = useRouter()
    let data:Product[] = [];
    products.map((product: Product_db) => {
    data.push(
        {
            id:          product.id,
            productName: product.product_name,
            price:       product.price,
            inventoryId: product.inventory_id
        }
    )})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    // function for alternating row colors  
    function alternateColor(i:number) {
        if(i%2 == 0) {
            return 'bg-sky-200'
        }
        return 'bg-sky-100'
    }

    // function to handle row selection and dynamic routing
    const handleRowClick = (row: Row<Product>) => {
        router.push(`/inventory/${row.original.id}`)
    }

  return(
    <div className=" flex flex-col">
      <h1 className='bg-sky-700 p-2 text-2xl'>
        All Products Offered
      </h1>
      <table className='bg-sky-500'>
        <thead className='bg-sky-900'>
          {table.getHeaderGroups().map((headerGroup, i) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className='text-start p-2'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, i)=> (
            <tr key={row.id}  onClick={()=> handleRowClick(row)} className={`${alternateColor(i)} text-sky-700 hover:text-green-500 hover:cursor-pointer`}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className='p-2'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>   
              ))}
            </tr>
          ))}
        </tbody>
      </table>  
    </div>
    )
}

export default Inventory