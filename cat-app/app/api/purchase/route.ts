import { useCartStore } from "@/app/components/UseCartStore";
import prisma from "@/app/lib/prismadb";
import { buildTrackingNumber, getRandomDate, replacer } from "@/app/lib/utils";
import { NextResponse } from "next/server";

// POST async handler for adding a new purchases
export async function POST(request: any) {
  const { 
    item,
    customer_id
  } = await request.json();

 ;

  const purchase = await prisma.order.create({
    data: {                   
      customer_id:             customer_id,
      tracking_number:         buildTrackingNumber(),
      purchase_date:           new Date(Date.now()),
      estimated_delivery_date: getRandomDate(),
      item_quantity:           item.quantity,
      shipped_from:            'item.shippedFrom',
      item_id:                 item.id
    }
  })
  
  const purchasesString = JSON.stringify(purchase, replacer)
  await prisma.$disconnect();
  return NextResponse.json(purchasesString);
}