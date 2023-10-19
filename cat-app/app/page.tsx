import { getServerSession } from "next-auth";
import { Toaster } from "react-hot-toast";
import current from "./actions/CurrentUser";
import { handler } from "./api/auth/[...nextauth]/route";
import Header from "./components/Header";
import Login from "./components/modal/Login";
import Register from "./components/modal/Register";
import Logout from "./components/Logout";
import { GET } from "./api/order/route"
import UserHero from "./components/UserHero";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  const currentUser = await current();
  console.log("index ", session, currentUser)
  return (
    <>
      <Toaster />
      <Login />
      {session ? 
        <>
          <Header label="Home" showBackArrow/>
          <Logout />
          <div>
            {currentUser? redirect('/home') : '...loading...'}
          </div>
        </>
        : 
        <Register />}
    </>
  );
}