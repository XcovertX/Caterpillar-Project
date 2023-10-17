import prisma from "@/app/lib/prismadb";
import md5 from "md5";
import { NextResponse } from "next/server";

// POST async handler for registering new users
export async function POST(request: any) {
  const { 
    email,
    firstname, 
    lastname,
    shipAddress,
    shipCity,
    shipCountry,
    shipState,
    billAdress,
    billCity,
    billCountry,
    billState,
    phoneNumber,
    cardNumber,
    cardType,
    password,  } = await request.json();
  const user = await prisma.user.create({
    data: {
      email, 
      password, 
      firstname, 
      lastname,
      shipAddress,
      shipCity,
      shipCountry,
      shipState,
      billAdress,
      billCity,
      billCountry,
      billState,
      phoneNumber,
      cardNumber,
      cardType
      password: md5(password),

    },
  });
  return NextResponse.json(user);
}