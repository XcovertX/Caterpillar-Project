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
  const orderSummary:OrderSummary = {
    id:                      order.id,
    orderDate:               dateFormater(order.purchase_date),
    etaDate:                 dateFormater(order.estimated_delivery_date),
    item:                    order.item,
    trackingNumber:          order.tracking_number,
    shippedFromAddress:      order.shipped_from,  
    individualCost:          order.item.price,
    itemQuantity:            order.item_quantity,
    totalCost:               order.item.price * order.item_quantity
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