
import { OrderSummary } from "../types/order"


const PurchaseSummary = ({ order }: OrderSummary) => {
    return (

            <div className=''>
                <div className='p-5 bg-sky-500 items-center flex flex-row justify-between'>
                    <h1 className="text-2xl ">Purchase Summary</h1>
                    <h1>Order Date: {order.orderDate}</h1>
                </div>
                <div className='bg-white'>
                    <div className='p-5 text-sky-900 flex flrex-row justify-between'>
                    <h1>Order Date: {order.orderDate}</h1>
                    <div className="flex border-4 flex-col text-2xl justify-start p-5">
                        <h1>
                            Shipped From:
                        </h1>
                        <div className='p-2 text-lg'>
                            <h1>{order.shippedFromAddress.streetAddress}</h1>
                            <div className='flex flex-row justify-start'>
                                <h1>{order.shippedFromAddress.city}</h1>
                                <h1>, {order.shippedFromAddress.state}</h1>
                            </div>
                            <div className='flex flex-row justify-start'>
                                <h1>{order.shippedFromAddress.zipCode}</h1>
                                <h1>, {order.shippedFromAddress.country}</h1>
                            </div>
                        </div>

                    </div>
                    </div>
                </div>
 
            </div>

    )
}

export default PurchaseSummary