"use client";
import { useCartStore } from "./UseCartStore";
import useFromStore from "../hooks/UseFromStore";
import CartItem from "./CartItem";

export default function Cart() {
 const cart = useFromStore(useCartStore, state => state.cart)

 let total = 0
 if (cart) {
  total = cart.reduce((acc, product) => acc + product.price * (product.quantity as number), 0)
 }

 return (
  <section className="text-lg">
   <h3 className='text-2xl font-bold mb-4 bg-sky-500 p-5 text-white rounded-lg'>Shopping Cart</h3>
   <ul>
    {cart?.map(product => (
     <CartItem key={product.id} product={product} />
    ))}
   </ul>
   <div className='flex bg-sky-500 p-5 text-white justify-between items-center mt-4 rounded-lg'>
    <span className='text-2xl font-bold'>Total:</span>
      <div className='flex flex-row justify-between w-24 mr-20' >
      <h1>$</h1>
      <h1 className=''>{total.toFixed(2)}</h1>
    </div>
   </div>
  </section>
 )
}