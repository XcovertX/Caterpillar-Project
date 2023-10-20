import prisma from "@/app/lib/prismadb";
import { getServerSession } from "next-auth";
import { handler } from "../api/auth/[...nextauth]/route";

const current = async () => {

  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
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

    if(!currentUser) {
      const currentAdmin = await prisma.admin.findFirst({

        where: {
          contact_information: {
            email: session?.user.email
          } 
        },
        include: {
          contact_information: true
        }
      });
      return currentAdmin
    }

    return currentUser;
  } catch (error) {
    console.error("CurrentUser Error: ", error)
    return null;
  }
};

export default current;