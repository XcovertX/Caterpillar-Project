import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import getOrders from "../actions/GetOrders";
import { reviver } from "../lib/utils";
import Customers from "../components/Customer-Accounts";
import getAllCustomers from "../actions/GetCustomers";

export default async function Page() {
  const session = await getServerSession();
  let customers = await getAllCustomers();
  customers     = JSON.parse(customers, reviver);

  return (
    <div>
      
      {session? 
      <>
        <Customers customers={customers} />
      </>
      : redirect('/')}
    </div>
  );
}