import prisma from "@/app/lib/prismadb";
import { replacer } from "@/app/lib/utils";
import { NextResponse } from "next/server";

type Props = {
  params: { id?: number }
}

// dynamic GET async handler for retrieving a product by its id #
export async function GET(request: any, { params }: Props) {
  try {
    if (!params.id) {
      throw new Error("ERROR: no productId");
    }
      const order = await prisma.item.findUnique({
        where: {
          id: params.id,
        },
      });
      const inventoryString = JSON.stringify(order, replacer) // handler for BigInt data type stringify serielization
      await prisma.$disconnect();
      return NextResponse.json(inventoryString);
    
  } catch (error) {
    console.error(error)
    await prisma.$disconnect();
    return NextResponse.json("error", { status: 500 });
  } 
}