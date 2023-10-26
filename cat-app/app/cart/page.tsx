import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import getOrders, { getOrdersByCutomerId } from "../actions/GetOrders";
import { reviver } from "../lib/utils";
import PurchaseHistory from "../components/PurchaseHistory";
import current from "../actions/CurrentUser";
import CustomerSummary from "../components/CustomerSummary";
import { getAddressByAddressId } from "../actions/GetAddress";
import getSingleCustomerByUserId from "../actions/GetSingleCustomer";
import { Customer, Customer_db } from "../types/customer";
import Cart from "../components/Cart";

export default async function Page() {
  const session     = await getServerSession();

  return (
    <div>
      
      {session? 
      <>
        
        <Cart />
        
      </>
      : redirect('/')}
      
      
    </div>
  );
}