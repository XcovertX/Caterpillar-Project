import getSingleUser from "@/app/actions/GetSingleUser";
import Header from "@/app/components/Header";
import UserHero from "@/app/components/UserHero";
import current from "@/app/actions/CurrentUser";
import Edit from "@/app/components/modal/Edit";
import { Toaster } from "react-hot-toast";
type Props = {
    params: {
        userId: bigint
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
        
        {/* userhero */}
        <UserHero
          purchaseHistory={[]}
        />
        {/* <Edit user={user} /> */}
      </div>
    </>
  );
}

export default page;