import { Address } from "./address"

export type Customers = {
    customers: Customer[]
}

export type Customer = {
          id:                   bigint
          firstName:            string
          lastName:             string
          cardId:               bigint
          password:             string
          createdDate:          Date
          userType:             string
          cardInformation: {
            id:                 bigint,
            cardNumber:         string,
            cardType:           string
          }, 
          email:                string,
          phone:                string,
          shippingAddressId:    bigint,
          billingAddressId:     bigint
        
    }

export type Customers_db = {
    customers: Customer_db[]
}

export type Customer_db = {
    id:                      bigint
    first_name:              string
    last_name:               string
    contact_information_id:  bigint
    card_id:                 bigint
    password:                string
    created_date:            Date
    user_type:               string
    card_information: {
        id:                  bigint,
        card_number:         string,
        card_type:           string
    },
    email:                   string,
    phone:                   string,
    shipping_address:        Address,
    billing_address:         Address
}