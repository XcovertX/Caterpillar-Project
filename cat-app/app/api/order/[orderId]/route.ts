import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

type Props = {
  params: { orderId: number }
}

// dynamic GET async handler for retrieving an order by its id number
export async function GET(request: any, { params }: Props) {
  try {
    if (!params.orderId) {
      return NextResponse.json("error: no orderId provided");
    }

    const post = await prisma.order.findUnique({
      where: {
        orderid: params.orderId,
      },
      include: {
        user: true,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json("error", { status: 500 });
  } 
}