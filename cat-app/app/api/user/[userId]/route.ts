import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

type Props = {
  params: { userId: number }
}

// dynamic GET async handler for retrieving an existing user's information
export async function GET(request: any, { params }: Props) {

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: params.userId,
      },
    });

    console.log(`user: ${user}`);

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
  }
}

// dynamic PATCH async handler for modifying existing user's information
export async function PATCH(request: any, { params }: Props) {
  const body = await request.json();

  try {
    const updateUser = await prisma.user.update({
      where: {
        id: params.userId,
      },
      data: {
        firstname: body.firstname,
        lastname: body.lastname,
        shippingaddress: body.shippingaddress,
        shippingcity: body.shippingcity,
        shippingcountry: body.shippingcountry,
        billingaddress: body.billingaddress,
        billingcity: body.billingcity,
        phone: body.phone,
        email: body.email,
        password: body.password
      },
    });
    console.log("user updated");
    return Response.json(updateUser, { status: 200 });
  } catch (error) {
    return NextResponse.json("error", { status: 500 });
  }
}