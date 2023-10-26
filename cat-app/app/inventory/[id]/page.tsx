import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import getSingleProductByProductId from "@/app/actions/GetSingleProduct";
import { reviver } from "@/app/lib/utils";
import { Product, Product_db } from "@/app/types/product";
import ProductSummary from "@/app/components/ProductSummary";

type Params = {
    id: bigint
}

export default async function Page( props: Params ) {
  const session = await getServerSession();
  const res     = await getSingleProductByProductId(props.params.id);
  const product: Product_db  = JSON.parse(res, reviver);
  const productSummary = {
    id:               product.id,
    name:             product.name,
    price:            product.price,
    manufacturedFrom: product.manufactured_from 
  }

  return (
    <div>
      {session? 

      <ProductSummary {...productSummary} />

      : redirect('/')}
    </div>
  );
}