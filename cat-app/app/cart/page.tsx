import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import current from "../actions/CurrentUser";

import Cart from "../components/Cart";

export default async function Page() {
  const session     = await getServerSession();
  const currentUser = await current()
  return (
    <div>
      
      {session? 
      <>
        
        <Cart customerId={currentUser?.id}/>
        
      </>
      : redirect('/')}
      
      
    </div>
  );
}