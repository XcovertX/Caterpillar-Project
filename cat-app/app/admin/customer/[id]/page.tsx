import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import getSingleProductByProductId from "@/app/actions/GetSingleProduct";
import { reviver } from "@/app/lib/utils";
import { Product, Product_db } from "@/app/types/product";
import ProductSummary from "@/app/components/ProductSummary";
import CustomerSummary from "@/app/components/CustomerSummary";
import { Customer_db } from "@/app/types/customer";
import getSingleCustomerByUserId from "@/app/actions/GetSingleCustomer";
import { getOrdersByCutomerId } from "@/app/actions/GetOrders";
import { Orders_db } from "@/app/types/order";
import { Address } from "@/app/types/address";
import { getAddressByAddressId } from "@/app/actions/GetAddress";

type Params = {
    id: bigint
}

export default async function Page( props: Params ) {
  const session = await getServerSession();
  const res     = await getSingleCustomerByUserId(props.params.id);
  const customer: Customer_db  = JSON.parse(res, reviver);
  const ordersRes = await getOrdersByCutomerId(props.params.id);
  const orders: Orders_db  = JSON.parse(ordersRes, reviver);
  const addressResS = await getAddressByAddressId(customer.contact_information.shipping_address_id);
  const addressS: Address  = JSON.parse(addressResS, reviver);
  const addressResB = await getAddressByAddressId(customer.contact_information.billing_address_id);
  const addressB: Address  = JSON.parse(addressResB, reviver);
  const customerSummary = {
    id:                   customer.id,
    firstName:            customer.first_name,
    lastName:             customer.last_name,
    contactInformationId: customer.contact_information_id,
    cardId:               customer.card_id,
    password:             customer.password,
    createdDate:          customer.created_date,
    userType:             customer.user_type,
    cardInformation: {
      id:                 customer.card_information.id,
      cardNumber:         customer.card_information.card_number,
      cardType:           customer.card_information.card_type,
    }, 
    contactInformation: {
      id:                 customer.contact_information.id,
      email:              customer.contact_information.email,
      phone:              customer.contact_information.phone,
      shippingAddressId:  customer.contact_information.shipping_address_id,
      billingAddressId:   customer.contact_information.billing_address_id,  
    }
  }
  return (
    <div>
      {session? 
      <>
        <CustomerSummary 
          customer={customerSummary} 
          orders={orders} 
          billingAddress={addressB} 
          shippingAddress={addressS}/>
      </>
      : redirect('/')}
    </div>
  );
}