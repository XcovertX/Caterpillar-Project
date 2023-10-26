
import { Product } from "../types/product"

const ProductSummary = (props: Product) => {
    return (
        <div className='items-center flex flex-col grow w-full'>
            <div className='bg-white w-full'>
                <div className='p-5 bg-sky-500 items-center w-full'>
                    <h1 className="text-2xl text-center ">Product Summary</h1>
                </div>
                <div className='p-5 flex flex-row justify-center'>
                    <div className='p-2 text-sky-900 flex flex-col justify-between'>
                        <h1>Item ID:</h1>
                        <h1>Item Name:</h1>
                        <h1>Item Price:</h1>
                    </div>
                    <div className='p-2 text-sky-900 flex flex-col justify-between'>
                        <h1>{props.id.toString()}</h1>
                        <h1>{props.productName}</h1>
                        <h1>${props.price}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductSummary