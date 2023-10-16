import getSingleUser from "@/app/actions/GetSingleUser";
import Header from "@/app/components/Header";
import UserHero from "@/app/components/UserHero";
import current from "@/app/actions/CurrentUser";
import Edit from "@/app/components/modal/Edit";
import { Toaster } from "react-hot-toast";
import { signOut } from "next-auth/react";

type Props = {
    params: {
        userId: string
    }
}

async function page({ params: { userId } }: Props) {
  const user = await getSingleUser(userId);

  const currentUser = await current();


  return (
    <>
      <Toaster />

      <Header showBackArrow label={user?.name} />

      <div className="h-screen overflow-scroll-none">
        
      <button onClick={() => signOut()}>Logout</button>
        {/* userhero */}
        <UserHero
          userId={user?.id}
          coverPic={user?.coverPic}
          profilePic={user?.profilePic}
        />
        <Edit user={user} />
      </div>
    </>
  );
}

export default page;