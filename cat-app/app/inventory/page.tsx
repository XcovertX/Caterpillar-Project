import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { reviver } from "@/app/lib/utils";
import getInventory from "@/app/actions/GetInventory";

// landing page after user authentication
export default async function Page() {
  const session = await getServerSession();
  let products  = await getInventory();
  products      = JSON.parse(products, reviver);
  const accountType = session?.user?.accountType;
  return (
    <div>
      {(session && (accountType == 'Admin' || accountType == 'Customer'))? 
      <>
        {accountType == 'Admin'?
          <></>
          : 
          {}
        }
     
      </>
      : redirect('/')}
    </div>
  );
}