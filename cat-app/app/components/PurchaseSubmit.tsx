
import toast from "react-hot-toast";
import { Product } from "../types/product";
import Button from "./Button";
require('./patch.js') //bigint isssue

type Props = {
    items: Product[] | undefined,
    customer_id:       bigint
}

function SubmitPurchase({ items, customer_id }: Props){

    async function onClick() {
        try {

          const response = await fetch("/api/purchase", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              items,
              customer_id
            }),
          });
          if (!response.ok) {
            throw new Error("Invalid response");
          }

          toast.success("Purchase was successful!");
        } catch (error) {
            console.error("Account error: ", error);
        }
    }

    return (
    <Button
        label="Submit"
        disabled={false}
        onClick={() => onClick()}
        secondary
        />
    );
}

export default SubmitPurchase;
