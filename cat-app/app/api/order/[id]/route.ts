import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

type Props = {
  params: { orderId?: number, customerId?:number }
}

// dynamic GET async handler for retrieving an order by
// either a orderId or all orders if customerId number is provided
export async function GET(request: any, { params }: Props) {
  try {
    if (!params.orderId && !params.customerId) {
      return NextResponse.json("error: no orderId or customerId provided");
    }
    if (params.orderId && params.customerId) {
      return NextResponse.json("error: please provide either customer id or order id, not both");
    }

    if(params.orderId) {
      const order = await prisma.order.findUnique({
        where: {
          orderid: params.orderId,
        },
        include: {
          user: true,
        },
      });
      return NextResponse.json(order);
    } else {
      const order = await prisma.order.findMany({
        where: {
          customerid: params.customerId,
        },
        include: {
          user: true,
        },
      });
      return NextResponse.json(order);
    }
  } catch (error) {
    return NextResponse.json("error", { status: 500 });
  } 
}