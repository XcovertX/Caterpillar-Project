
import Link from "next/link"
import { OrderSummary } from "../types/order"

const PurchaseSummary = ({ order }: OrderSummary) => {

    return (
            <div className=''>
                <div className='p-5 bg-sky-500 items-center flex flex-row justify-between'>
                    <h1 className="text-2xl ">Purchase Summary</h1>
                    <h1>Order Date: {order.orderDate}</h1>
                </div>
                <div className='bg-white'>
                    <div className='p-5 text-sky-900 flex flex-row justify-between'>
                        <div className='p-2 mr-2 flex grow justify-between'>
                            <div className='flex flex-col justify-start'>
                                <h1>Order Date:</h1>
                                <h1>ETA Date:</h1>
                                <h1>Item Name:</h1>
                                <h1>Item Price:</h1>
                                <h1>Quantity:</h1>
                                <h1>Total:</h1>
                            </div>
                            <div className='flex flex-col justify-start'>
                                <h1 className="text-end">{order.orderDate}</h1>
                                <h1 className="text-end">{order.etaDate}</h1>
                                <Link className="underline text-pink-500 hover:text-green-500" href={`/inventory/${order.item.id}`}>{order.item.name}</Link>
                                <h1 className="text-end">$ {(order.item.price).toFixed(2)}</h1>
                                <h1 className="text-end">{order.itemQuantity}</h1>
                                <h1 className="text-end">$ {order.totalCost.toFixed(2)}</h1>
                            </div>
                        </div>
                        
                        <div className="flex border-4 flex-col text-2xl justify-start p-5">
                            <h1>
                                Shipped From:
                            </h1>
                            <div className='p-2 text-sm'>
                                <h1>{order.shippedFromAddress}</h1>
                            </div>

                        </div>
                    </div>
                </div>
 
            </div>

    )
}

export default PurchaseSummary