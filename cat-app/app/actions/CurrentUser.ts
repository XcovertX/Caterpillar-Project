import prisma from "@/app/lib/prismadb";
import { getServerSession } from "next-auth";
import { handler } from "../api/auth/[...nextauth]/route";

const current = async () => {

  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return null;
    }


    const currentCustomer = await prisma.customer.findFirst({

      where: {
        email: session?.user.email 
      }

    });
    

    if(!currentCustomer) {
      const currentAdmin = await prisma.admin.findFirst({

        where: {
            email: session?.user.email
        } 
      });
      return currentAdmin;
    }
    if(currentCustomer.user_type === null) {
      currentCustomer.user_type = "customer";
    }
    await prisma.$disconnect();
    return currentCustomer;
  } catch (error) {
    console.error("CurrentUser Error: ", error)
    await prisma.$disconnect();
    return null;
  }
};

export default current;