import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

// GET async handler for retrieving all users
// ordering them from newest to oldest
export async function GET() {
  try {
    const users = await prisma.customer.findMany({
      orderBy: {
        created_date: "desc",
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
  }
}