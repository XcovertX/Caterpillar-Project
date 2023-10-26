'use client'
import {
    Row,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table'
import { dateFormater } from '../lib/utils';
import {  useRouter } from 'next/navigation';
import { OrderSummary, Orders_db } from '../types/order';

type Order = {
    id:                 bigint
    orderDate:          string
    item:               string
    trackingNumber:     string
    individualCost:     string
    shippedFromAddress: string
    itemQuantity:       number
    totalCost:          string
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
      columnHelper.accessor('itemQuantity', {
          header: 'Quantity',
      }),
      columnHelper.accessor('totalCost', {
          header: 'Total Cost',
      }),
    ]

const PurchaseHistory = ({ orders }: Orders_db) => {
    const router = useRouter()
    let data:OrderSummary[] = [];
    orders.map((order, i) => {
    data.push(
        {
            id:             order.id,
            orderDate:      dateFormater(order.purchase_date),
            etaDate:        dateFormater(order.estimated_delivery_date),
            item:           order.item.name,
            trackingNumber: order.tracking_number,
            individualCost: "$ " + order.item.price.toFixed(2),
            shippedFromAddress: order.shipped_from,
            itemQuantity:   order.item_quantity,
            totalCost:      "$ " + (order.item.price * order.item_quantity).toFixed(2)
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
    const handleRowClick = (row: Row<Order>) => {
        router.push(`/purchase-history/${row.original.id}`)
    }

  return(
    <div className="flex flex-col grow w-full">
      <h1 className='bg-sky-700 text-white p-2 text-2xl'>
        Purchase History
      </h1>
      <table className='bg-sky-500'>
        <thead className='bg-sky-900 text-white'>
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
