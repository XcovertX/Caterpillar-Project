import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import getSingleOrderByOrderId from "@/app/actions/GetSingleOrder";
import { dateFormater, reviver } from "@/app/lib/utils";
import PurchaseHistory from "@/app/components/PurchaseHistory";
import getSingleOrder from "@/app/actions/GetSingleOrder";
import PurchaseSummary from "@/app/components/PurchaseSummary";
import { Order_db, OrderSummary } from "@/app/types/order";

type Params = {
    id: bigint
}

export default async function Page(  props: Params ) {
  const session = await getServerSession();
  const res     = await getSingleOrderByOrderId(props.params.id);
  const order:Order_db  = JSON.parse(res, reviver);
  const orderSummary = {
    orderDate:               dateFormater(order.purchase_date),
    item:                    order.product.product_name,
    trackingNumber:          order.tracking_number,
    shippedFromAddress:      {
      streetAddress:         order.address.street_address,
      city:                  order.address.city,
      state:                 order.address.state,
      zipCode:               order.address.zipcode,
      country:               order.address.country,
    },
    individualCost:          order.product.price,
    quantity:                order.quantity,
    totalCost:               order.total
}

  return (
    <div>
      
      {session? 
      <>
        <PurchaseSummary order={orderSummary} />
      </>
      : redirect('/')}
    </div>
  );
}