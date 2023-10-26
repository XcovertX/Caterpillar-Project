
import { getServerSession } from "next-auth";
import { Toaster } from "react-hot-toast";
import current from "./actions/CurrentUser";
import Login from "./components/modal/Login";
import Register from "./components/modal/Register";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  const currentUser = await current();
  const accountType = currentUser?.user_type
console.log("page: ", accountType, currentUser)
  return (
    <div>
      <Toaster />
      <Login />
      {(session && (accountType == 'admin' || accountType == 'customer'))? 
      <>
        {accountType === 'admin'?
          
          redirect('/admin')
          : 
          redirect('/home')
        }
     
      </>
      : <Register />}
    </div>
  );
}