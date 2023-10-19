import prisma from "@/app/lib/prismadb";
import { getServerSession } from "next-auth";
import { handler } from "../api/auth/[...nextauth]/route";

const current = async () => {

  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      console.log("no session -> user -> email")
      console.log(session)
      return null;
    }

    const currentUser = await prisma.customer.findFirst({

      where: {
        contact_information: {
          email: session?.user.email
        } 
      },
      include: {
        contact_information: true
      }
    });

    return currentUser;
  } catch (error) {
    console.error("CurrentUser Error: ", error)
    return null;
  }
};

export default current;