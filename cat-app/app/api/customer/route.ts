import prisma from "@/app/lib/prismadb";
import { replacer } from "@/app/lib/utils";
import { NextResponse } from "next/server";

// GET async handler for retrieving all customers
// ordering them from newest to oldest account creation
export async function GET() {
  try {
    const users = await prisma.customer.findMany({
      orderBy: {
        created_date: "desc",
      },
      include: {
        card_information: true,
        contact_information: true
      }
    });
    const customers = JSON.stringify(users, replacer)
    
    return NextResponse.json(customers);
  } catch (error) {
    console.error(error);
  }
}