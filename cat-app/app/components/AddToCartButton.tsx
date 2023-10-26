
import { Product } from "../types/product"
import Button from "./Button"
import { useCartStore } from "./UseCartStore"
require('./patch.js') //bigint isssue

type Props = {
    product: Product
}

export default function AddToCartButton({ product }: Props) {
// Recover the store action to add items to cart
  const addToCart = useCartStore(state => state.addToCart)


 return (
    <Button
        label="Add To Cart"
        disabled={false}
        onClick={() => addToCart(product)}
    />
 )
}