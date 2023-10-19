'use client'
import {
    Row,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table'
import { dateFormater } from '../lib/utils';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';

type Props = {
  orders: [
      {
        total:                   number;
        id:                      bigint,
        tracking_number:         string,
        shipped_from_address_id: bigint,
        purchase_date:           Date,
        estimated_delivery_date: Date,
        product_id:              bigint,
        quantity:                number,
        customer_id:             bigint,
        product: {
            id:                  bigint,
            product_name:        string,
            price:               number,
            inventory_id:        bigint
      },
        address: {
            id:                  bigint,
            street_address:      string,
            city:                string,
            state:               string,
            zipcode:             string
      }
    }
  ]
}

type Order = {
    id:             bigint
    orderDate:      string
    item:           string
    trackingNumber: string
    individualCost: number
    quantity:       number
    totalCost:      number
}

  const columnHelper = createColumnHelper<Order>()
  const columns = [
        columnHelper.accessor('id', {
        header: 'OrderID'}),
      columnHelper.accessor('orderDate', {
          header: 'Order Date'}),
      columnHelper.accessor('item', {
          header: 'Item',
      }),
      columnHelper.accessor('trackingNumber', {
          header: 'Tracking Number',
      }),
      columnHelper.accessor('individualCost', {
          header: 'Cost Per Item',
      }),
      columnHelper.accessor('quantity', {
          header: 'Quantity',
      }),
      columnHelper.accessor('totalCost', {
          header: 'Total Cost',
      }),
    ]

const PurchaseHistory = ({ orders }: Props) => {
    const router = useRouter()
    let data:Order[] = [];
    orders.map((order, i) => {
    data.push(
        {
            id:             order.product_id,
            orderDate:      dateFormater(order.purchase_date),
            item:           order.product.product_name,
            trackingNumber: order.tracking_number,
            individualCost: order.product.price,
            quantity:       order.quantity,
            totalCost:      order.total
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

    // function to handle row selection routing
    const handleRowClick = (row: Row<Order>) => {
        router.push('/purchase-history/')
    }

  return(
    <div className=" flex flex-col">
      <h1 className='bg-sky-700 p-2 text-2xl'>
        Purchase History
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



export default PurchaseHistory
