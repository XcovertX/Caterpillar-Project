import { getServerSession } from "next-auth";
import { Toaster } from "react-hot-toast";
import current from "./actions/CurrentUser";
import { handler } from "./api/auth/[...nextauth]/route";
import Header from "./components/Header";
import Login from "./components/modal/Login";
import Register from "./components/modal/Register";
import Form from "./components/post/Form";
import Logout from "./components/Logout";


export default async function Home() {
  const session = await getServerSession(handler);
  const currentUser = await current();
  return (
    <>
      <Toaster />
      <Login />
      {session ? "" : <Register />}
      <Header label="Home" showBackArrow/>
      <Logout />
      <div className="h-screen overflow-scroll scrollbar-none">
        <Form placeholder="what's your mind...?" />
      </div>
    </>
  );
}