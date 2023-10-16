import prisma from "@/app/lib/prismadb";
import md5 from "md5";
import { NextResponse } from "next/server";

// POST async handler for registering new users
export async function POST(request: any) {
  const { email, firstname, lastname, password } = await request.json();
  const user = await prisma.user.create({
    data: {
      email,
      firstname,
      lastname,
      password: md5(password),
    },
  });
  return NextResponse.json(user);
}