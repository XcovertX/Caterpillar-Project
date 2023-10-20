'use client'
import {
    Row,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table'
import { useRouter } from 'next/navigation';
import { Customers_db, Customer, Customer_db,  } from '../types/customer';

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
    columnHelper.accessor('contactInformation.email', {
        header: 'Email',
    }),
  ]

const Customers = ({ customers }: Customers_db) => {
    const router = useRouter()

    let data:Customer[] = [];
    console.log(customers)
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
            contactInformationId: customer.contact_information_id,
            cardInformation: {
              id:                 customer.card_information.id,
              cardNumber:         customer.card_information.card_number,
              cardType:           customer.card_information.card_type
            }, 
            contactInformation: {
              id:                 customer.contact_information.id,
              email:              customer.contact_information.email,
              phone:              customer.contact_information.phone,
              shippingAddressId:  customer.contact_information.shipping_address_id,
              billingAddressId:   customer.contact_information.billing_address_id
            }
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
    const handleRowClick = (row: Row<Customer>) => {
        router.push(`/admin/customer/${row.original.id}`)
    }

  return(
    <div className=" flex flex-col">
      <h1 className='bg-sky-700 p-2 text-2xl text-center'>
        All Customers
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

export default Customers