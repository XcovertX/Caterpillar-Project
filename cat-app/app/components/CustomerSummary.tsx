
import { dateFormater } from "../lib/utils"
import { Address } from "../types/address"
import { Customer } from "../types/customer"
import { Orders_db } from "../types/order"
import PurchaseHistory from "./PurchaseHistory"

type Props = {
    customer: Customer,
    orders: Orders_db
}

const CustomerSummary = ({ customer, orders }: Props) => {

    return (
        <div className=''>
            <div className=' rounded-md bg-zinc-100 shadow-lg items-center w-full flex flex-col text-lg'>
                <div className='p-5 bg-sky-500 items-center w-full'>
                    <h1 className="text-2xl text-white font-bold">Customer Summary</h1>
                </div>
                <div className='p-10 flex flex-row w-full justify-between'>
                    <div className="flex flex-row">
                        <div className='p-2 text-sky-900 flex flex-col font-bold justify-between'>
                            <h1>CustomerID:</h1>
                            <h1>First Name:</h1>
                            <h1>Last Name:</h1>
                            <h1>Customer Since:</h1>
                        </div>
                        <div className='p-2 text-sky-900 flex flex-col justify-between'>
                            <h1>{customer.id.toString()}</h1>
                            <h1>{customer.firstName}</h1>
                            <h1>{customer.lastName}</h1>
                            <h1>{dateFormater(customer.createdDate)}</h1>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className='p-2 text-sky-900 flex flex-col justify-between'>
                            <h1 className='font-bold text-xl'>Shipping Address</h1>
                            <h1>{customer.shippingAddress?.street}</h1>
                            <h1>{customer.shippingAddress?.city}</h1>
                            <h1>{customer.shippingAddress?.country}</h1>
                        </div>
                        <div className='p-2 text-sky-900 flex flex-col justify-between'>
                            <h1 className='font-bold text-xl'>Billing Address</h1>
                            <h1>{customer.billingAddress?.street}</h1>
                            <h1>{customer.billingAddress?.city}</h1>
                            <h1>{customer.billingAddress?.country}</h1>
                        </div>
                    </div>
                </div>
                <div className="p-5 w-full">
                    <PurchaseHistory orders={orders}/>
                </div>
            </div>
        </div>
    )
}
export default CustomerSummary