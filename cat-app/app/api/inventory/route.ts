import current from "@/app/actions/CurrentUser";
import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";
import { replacer, reviver } from "@/app/lib/utils";

// GET async handler for retrieving all products available
export async function GET() {
  const currentUser = await current();
  
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        price: "desc",
      },
    });
    const productsString = JSON.stringify(products, replacer) // handler for BigInt data type stringify serielization
    return NextResponse.json(productsString);
  } catch (error) {
    console.error("ERROR: failed to retrieve the inventory", error);
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
        
        customer_id: CurrentUser.id,
      },
    });
    console.log("order created");
    return Response.json(order);
  } catch (error) {
    console.error(error);
  }
}