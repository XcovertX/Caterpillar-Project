import current from "@/app/actions/CurrentUser";
import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

// GET async handler for retrieving all orders in the app
// ordering them from newest to oldest
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createddate: "desc",
      },
      include: {
        orderitem: true,
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error getting posts");
    return new NextResponse("Internal error: ", { status: 500 });
  }
}

// POST async handler for posting a new order
export async function POST(request: any) {
  const CurrentUser = await current();
  const { body } = await request.json();

  try {
    if(!CurrentUser) {
      throw Error("oops! You must be logged in to add an order!")
    }
    const order = await prisma.order.create({
      data: {
        body,
        userId: CurrentUser.id,
      },
    });
    console.log("order created");
    return Response.json(order);
  } catch (error) {
    console.error(error);
  }
}