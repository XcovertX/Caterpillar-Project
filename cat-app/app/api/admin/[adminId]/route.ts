import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

type Props = {
  params: { userId: bigint }
}

// dynamic GET async handler for retrieving an existing user's information
export async function GET(request: any, { params }: Props) {

  try {
    const user = await prisma.customer.findUnique({
      where: {
        id: params.userId,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
  }
}

// dynamic PATCH async handler for modifying existing user's information
export async function PATCH(request: any, { params }: Props) {
  const body = await request.json();

  try {
    const updateUser = await prisma.customer.update({
      where: {
        id: params.userId,
      },
      data: {
        // first_name: body.firstname,
        // last_name: body.lastname,
        // shipping_address: body.shippingaddress,
        // shipping_city: body.shippingcity,
        // shippingcountry: body.shippingcountry,
        // billingaddress: body.billingaddress,
        // billingcity: body.billingcity,
        // phone: body.phone,
        // email: body.email,
        // password: body.password
      },
    });
    console.log("user updated");
    return Response.json(updateUser, { status: 200 });
  } catch (error) {
    return NextResponse.json("error", { status: 500 });
  }
}