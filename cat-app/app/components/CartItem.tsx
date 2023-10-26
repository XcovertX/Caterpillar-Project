import { useCartStore } from './UseCartStore'

export default function CartItem({ product }: Props) {

// Recover the store action to remove items from the cart
 const removeFromCart = useCartStore(state => state.removeFromCart)

 return (
  <li className='flex justify-between items-center gap-4  mb-2 shadow-md p-4'>
    {product.name}
   <div>
    <button
     title='Remove Item'
     className='text-red-500 hover:text-red-600 ml-4'
     onClick={() => removeFromCart(product)}
    >
     delete
    </button>
   </div>
  </li>
 )
}