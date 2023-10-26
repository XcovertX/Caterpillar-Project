import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { reviver } from "@/app/lib/utils";
import getInventory from "@/app/actions/GetInventory";
import Inventory from "../components/Inventory";

// landing page after user authentication
export default async function Page() {
  const session = await getServerSession();
  let products  = await getInventory();
  products      = JSON.parse(products, reviver);
  return (
    <div>
      {session? 
      <>
        <Inventory products={products}/>
      </>
      : redirect('/')}
    </div>
  );
}