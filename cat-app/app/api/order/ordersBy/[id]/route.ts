import prisma from "@/app/lib/prismadb";
import { replacer } from "@/app/lib/utils";
import { NextResponse } from "next/server";

type Props = {
  params: { id?: number }
}

// dynamic GET async handler for retrieving an order by customerId
export async function GET(request: any, { params }: Props) {
  try {

    if (!params.id) {
      throw new Error("ERROR: no customerId provided");
    }
      const order = await prisma.order.findMany({
        where: {
          customer_id: params.id,
        },
        include: {
          customer: true,
          product: true
        },
      });
      
      const orderString = JSON.stringify(order, replacer) // handler for BigInt data type stringify serielization
      return NextResponse.json(orderString);
    
  } catch (error) {
    console.error(error)
    return NextResponse.json("error", { status: 500 });
  } 
}