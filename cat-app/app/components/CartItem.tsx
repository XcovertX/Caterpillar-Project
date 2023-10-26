import { Product } from '../types/product'
import { useCartStore } from './UseCartStore'

type Props = {
  product: Product
}

export default function CartItem({ product }: Props) {

// Recover the store action to remove items from the cart
 const removeFromCart = useCartStore(state => state.removeFromCart)

 return (
  <li className='bg-white text-lg flex justify-between items-center gap-4  mb-2 shadow-md p-4'>
    <div className='flex flex-row justify-between items-center' >
      <div className='flex flex-row justify-between w-36' >
        <h1>{product.quantity}</h1>
        <h1>{product.name}</h1>
      </div>
    </div>
    <div className='flex flex-row justify-between items-center' >
    <div className='flex flex-row justify-between w-24' >
      <h1>$</h1>
      <h1 className=''>{product.price.toFixed(2)}</h1>
    </div>
    <button
      title='Remove Item'
      className='text-white hover:bg-red-500 ml-4 p-2 bg-black rounded-full hover:shadow-lg ml-10'
      onClick={() => removeFromCart(product)}
    >
      delete
    </button>
    </div>

  </li>
 )
}