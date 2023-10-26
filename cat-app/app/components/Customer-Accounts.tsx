'use client'
import {
    Row,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
  } from '@tanstack/react-table'
import { useRouter } from 'next/navigation';
import { Customers_db, Customer, Customer_db,  } from '../types/customer';
import { useEffect, useState } from 'react';

  const columnHelper = createColumnHelper<Customer>()
  const columns = [
    columnHelper.accessor('id', {
      header: 'Customer ID'
    }),
    columnHelper.accessor('firstName', {
      header: 'First Name',
    }),
    columnHelper.accessor('lastName', {
      header: 'Last Name',
    }),
    columnHelper.accessor('email', {
        header: 'Email',
    }),
  ]

const Customers = ({ customers }: Customers_db) => {
  const [data, setData] = useState<Customer[]>([])
  const router = useRouter()
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  useEffect(() => {
    let data:Customer[] = [];
    customers.map((customer: Customer_db) => {
    data.push(
        {
            id:                   customer.id,
            firstName:            customer.first_name,
            lastName:             customer.last_name,
            cardId:               customer.card_id,
            password:             customer.password,
            createdDate:          customer.created_date,
            userType:             customer.user_type,
            cardInformation: {
              id:                 customer.card_information.id,
              cardNumber:         customer.card_information.card_number,
              cardType:           customer.card_information.card_type
            }, 
            email:                customer.email,
            phone:                customer.phone,
            shippingAddress:      customer.shipping_address,
            billingAddress:       customer.billing_address
            
        }
    )})
    setData(data);
    table.setPageSize(100);
  }, [])

  // function for alternating row colors  
  function alternateColor(i:number) {
      if(i%2 == 0) {
          return 'bg-sky-200'
      }
      return 'bg-sky-100'
  }

  // function to handle row selection and dynamic routing
  const handleRowClick = (row: Row<Customer>) => {
      router.push(`/admin/customer/${row.original.id}`)
  }

  return(
    <div className=" flex flex-col shadow-lg rounded-md">
      <div className="flex flex-row justify-between bg-sky-700 p-5 text-2xl text-white items-center font-bold">
        <h1 className=''>
          All Customers
        </h1>
        <h1>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </h1>
      </div>
      <table className='bg-sky-500 text-white'>
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
            <tr key={row.id}  onClick={()=> handleRowClick(row)} className={`${alternateColor(i)} text-sky-700 hover:opacity-60 hover:cursor-pointer`}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className='p-2'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>   
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-row justify-center items-center  m-5  ">
        <div className="flex bg-white p-5 rounded-lg shadow-xl gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        </div>
      </div>   
    </div>
  )
}

export default Customers