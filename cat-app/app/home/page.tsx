import { getServerSession } from "next-auth";
import Logout from "../components/Logout";
import { redirect } from "next/navigation";


export default async function Page() {
  const session = await getServerSession()
  return (
    <div>
      {session? 
      <>
        <h1>Customer Data</h1>
        {session?.user.email}
      </>
      : redirect('/')}
      
      <Logout />
    </div>
  );
}