'use client'
import { Product } from "../types/product"
import AddToCartButton from "./AddToCartButton"

const ProductSummary = (props: Product) => {
    return (
        <div className='items-center flex flex-col grow w-full shadow-lg '>
        
            <div className='bg-white w-full rounded-lg'>
                <div className='p-5 bg-sky-500 items-center w-full'>
                    <h1 className="text-2xl text-center text-white font-bold ">Product Summary</h1>
                </div>
                <div className='p-5 flex flex-row justify-center'>
                    <div className='p-2 text-sky-900 flex flex-col justify-between'>
                        <h1>Item ID:</h1>
                        <h1>Item Name:</h1>
                        <h1>Item Price:</h1>
                    </div>
                    <div className='p-2 text-sky-900 flex flex-col justify-between'>
                        <h1>{props.id.toString()}</h1>
                        <h1>{props.name}</h1>
                        <h1>$ {props.price.toFixed(2)}</h1>
                    </div>
                </div>
                <div className="pb-5 flex justify-center">
                    
                    <AddToCartButton product={props}/>
                </div>
            </div>
            
        </div>
    )
}
export default ProductSummary