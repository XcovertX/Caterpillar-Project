
import toast from "react-hot-toast";
import { Product } from "../types/product";
import Button from "./Button";
import { useCartStore } from "./UseCartStore";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
require('./patch.js') //bigint isssue

type Props = {
    items: Product[],
    customer_id:       bigint
}

function SubmitPurchase({ items, customer_id }: Props){

    const removeFromCart = useCartStore(state => state.removeFromCart)
    const router = useRouter()
    async function onClick() {
      
      for (let index = 0; index < items.length; index++) {
        const item = items[index];

        try {
          const response = await fetch("/api/purchase", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              item,
              customer_id
            }),
          });

          if (!response.ok) {
            console.log("Purchase: ", response)
            throw new Error("Invalid response");
          }
          removeFromCart(item)
          console.log("Purchase: ", item, response)
          toast.success("Purchase was successful!");
        } catch (error) {
            console.error("Account error: ", error);
        }
        
      }
      router.refresh()
    }
    return (
    <Button
        label="Submit"
        disabled={false}
        onClick={() => {onClick()}}
        secondary
        />
    );
}

export default SubmitPurchase;
