import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import getOrders, { getOrdersByCutomerId } from "../actions/GetOrders";
import { reviver } from "../lib/utils";
import PurchaseHistory from "../components/PurchaseHistory";
import current from "../actions/CurrentUser";
import CustomerSummary from "../components/CustomerSummary";
import { getAddressByAddressId } from "../actions/GetAddress";
import getSingleCustomerByUserId from "../actions/GetSingleCustomer";

export default async function Page() {
  const session     = await getServerSession();
  const currentUser = await current();
  
  let orders, sAddress, bAddress, customer;
  if(currentUser?.id != undefined) {
    orders        = await getOrdersByCutomerId(currentUser?.id);
    orders            = JSON.parse(orders, reviver);
    sAddress = await getAddressByAddressId(currentUser.contact_information.shipping_address_id)
    sAddress            = JSON.parse(sAddress, reviver);
    bAddress = await getAddressByAddressId(currentUser.contact_information.billing_address_id)
    bAddress            = JSON.parse(bAddress, reviver);
    customer = await getSingleCustomerByUserId(currentUser.id)
    customer            = JSON.parse(customer, reviver);
  }

  return (
    <div>
      
      {session? 
      <>
        <CustomerSummary 
          orders={orders} 
          shippingAddress={sAddress} 
          billingAddress={bAddress}
          customer={customer}/>
        
      </>
      : redirect('/')}
      
      
    </div>
  );
}