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

export default async function Page() {
  const session     = await getServerSession();
  const currentUser = await current();
  
  let orders, sAddress, bAddress, customerdb, customerSum:Customer;
  if(currentUser?.id != undefined) {
    orders    = await getOrdersByCutomerId(currentUser?.id);
    orders    = JSON.parse(orders, reviver);
    sAddress  = await getAddressByAddressId(currentUser.shipping_address_id);
    sAddress  = JSON.parse(sAddress, reviver);

    if(currentUser.billing_address_id != null) {
      bAddress = await getAddressByAddressId(currentUser.billing_address_id);
      bAddress = JSON.parse(bAddress, reviver);
    } else {
      bAddress = sAddress;
    }
    customerdb = await getSingleCustomerByUserId(currentUser.id)
    const customer:Customer_db = JSON.parse(customerdb, reviver);
    customerSum = {
      id:                 customer.id,
      firstName:          customer.first_name,
      lastName:           customer.last_name,
      cardId:             customer.card_id,
      password:           customer.password,
      createdDate:        customer.created_date,
      userType:           customer.user_type,
      cardInformation: {
          id:             customer.card_information.id,
          cardNumber:     customer.card_information.card_number,
          cardType:       customer.card_information.card_type
      },
      email:              customer.email,
      phone:              customer.phone,
      shippingAddress:    sAddress,
      billingAddress:     bAddress
    }
  }

  console.log("home: ", currentUser, customerSum) 
  return (
    <div>
      
      {session? 
      <>
        <CustomerSummary 
          orders={orders} 
          shippingAddress={sAddress} 
          billingAddress={bAddress}
          customer={customerSum}/>
        
      </>
      : redirect('/')}
      
      
    </div>
  );
}