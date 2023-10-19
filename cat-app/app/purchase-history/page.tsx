import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import getOrders from "../actions/GetOrders";
import { reviver } from "../lib/utils";
import PurchaseHistory from "../components/PurchaseHistory";

export default async function Page() {
  const session = await getServerSession();
  let orders    = await getOrders();
  orders        = JSON.parse(orders, reviver);
  return (
    <div>
      
      {session? 
      <>
        <h1>Customer Profile</h1>
        <PurchaseHistory orders={orders} />
      </>
      : redirect('/')}
    </div>
  );
}