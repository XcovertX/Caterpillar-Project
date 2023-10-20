import prisma from "@/app/lib/prismadb";
import { replacer } from "@/app/lib/utils";
import md5 from "md5";
import { NextResponse } from "next/server";

// POST async handler for registering new users
// There are a number of vulnerabilities with this function
// For the sake of time, I ignored these and build it just well enough
// to enter a new customer in to the database
export async function POST(request: any) {
  const { 
    firstName,
    lastName,
    shipAdress,
    shipCity,
    shipCountry,
    shipState,
    shipZip,
    billAdress,
    billCity,
    billCountry,
    billState,
    billZip,
    phoneNumber,
    email,
    cardNumber,
    cardType,
    password,  } = await request.json();

    // build new card
    const card = await prisma.card_information.create({
      data: {
        card_number: cardNumber,
        card_type:   cardType
      }
    })
  
    // build new shipping and billing address. if no billing address is provided, shipping adress with be used.
    const addressShipping = await prisma.address.create({
      data: {
        street_address: shipCity,
        city:           shipCity,
        state:          shipState,
        zipcode:        shipZip,
        country:        shipCountry
      }
    })
    let addressBilling;
    if(shipAdress != billAdress) {
      addressBilling = await prisma.address.create({
        data: {
          street_address: billCity,
          city:           billCity,
          state:          billState,
          zipcode:        billZip,
          country:        billCountry
        }
      })
    } else {
      addressBilling = addressShipping
    }
    // build new contact info
    const contact = await prisma.contact_information.create({
      data: {
        email: email,
        phone: phoneNumber,
        shipping_address_id: addressShipping.id,
        billing_address_id: addressBilling.id
      }
    })
    // build new customer
    const customer = await prisma.customer.create({
      data: {
        first_name:   firstName, 
        last_name:    lastName,
        password:     md5(password),
        created_date: new Date(Date.now()),
        user_type:   'Customer',
        card_id:      card.id,
        contact_information_id: contact.id
      },
      include: {
            order: true
      }
    });

    const newUser = { 
      customer: customer
    }
  const user = JSON.stringify(newUser, replacer)
  return NextResponse.json(user);
}