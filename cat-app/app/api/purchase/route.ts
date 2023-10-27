import prisma from "@/app/lib/prismadb";
import { buildTrackingNumber, getRandomDate, replacer } from "@/app/lib/utils";
import { NextResponse } from "next/server";

// POST async handler for adding a new purchases
export async function POST(request: any) {
  console.log("ssssssssssssssssssssssssssssssss")
  const { 
    items,
    customer_id
  } = await request.json();

  let purchases = [];
  for(let i = 0; i < items.length; i++) {
    const item = items[i];
    purchases.push( await prisma.order.create({
      data: {                   
        customer_id:             customer_id,
        tracking_number:         buildTrackingNumber(),
        purchase_date:           new Date(Date.now()),
        estimated_delivery_date: getRandomDate(),
        item_quantity:           item.quantity,
        shipped_from:            'item.shippedFrom',
        item_id:                 item.id
      }
    }))
  };

  const purchasesString = JSON.stringify(purchases, replacer)
  await prisma.$disconnect();
  return NextResponse.json(purchasesString);
}