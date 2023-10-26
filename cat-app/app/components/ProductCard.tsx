import { Product } from "../types/product"
import { useCartStore } from "./UseCartStore"
require('./patch.js') //bigint isssue

type Props = {
    product: Product
}

export default function ProductCard({ product }: Props) {
// Recover the store action to add items to cart
 const addToCart = useCartStore(state => state.addToCart)

 return (
  <div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl flex flex-col justify-between p-4 '>
   <div className='flex-1 flex flex-col justify-between'>
    <div className='mt-4 flex items-center justify-between'>
     <button
      type='button'
      className='ml-2 bg-sky-500 text-white font-semibold py-2 px-4 rounded hover:bg-sky-600'
      onClick={() => addToCart(product)}
     >
      Add To Cart
     </button>
    </div>
   </div>
  </div>
 )
}