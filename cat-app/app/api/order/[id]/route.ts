import prisma from "@/app/lib/prismadb";
import { replacer } from "@/app/lib/utils";
import { NextResponse } from "next/server";

type Props = {
  params: { id?: number, customerId?:number }
}

// dynamic GET async handler for retrieving an order by
// either a orderId or all orders if customerId number is provided
export async function GET(request: any, { params }: Props) {

  try {

    if (!params.id && !params.customerId) {
      throw new Error("ERROR: no orderId or customerId provided");
    }
    
    if (params.id && params.customerId) {
      throw new Error("ERROR: please provide either customer id or order id, not both");
    }

    if(params.id) {
      const order = await prisma.order.findUnique({
        where: {
          id: params.id,
        },
        include: {
          item: true
        },
      });
      const orderString = JSON.stringify(order, replacer) // handler for BigInt data type stringify serielization
      await prisma.$disconnect();
      return NextResponse.json(orderString);
    } else {
      const order = await prisma.order.findMany({
        where: {
          customer_id: params.customerId,
        },
        include: {
          customer: true,
        },
      });
      
      const orderString = JSON.stringify(order, replacer) // handler for BigInt data type stringify serielization
      await prisma.$disconnect();
      return NextResponse.json(orderString);
    }
  } catch (error) {
    console.error(error)
    await prisma.$disconnect();
    return NextResponse.json("error", { status: 500 });
  } 
}