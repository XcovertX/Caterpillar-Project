export type Order_db = {
    id:                      bigint;
    tracking_number:         string;
    shipped_from_address_id: bigint;
    purchase_date:           Date;
    estimated_delivery_date: Date;
    product_id:              bigint;
    quantity:                number;
    customer_id:             bigint;
    total:                   number;
    product: {
        id:                  bigint;
        product_name:        string;
        price:               number;
        inventory_id:        bigint;
},
    address: {
        id:                  bigint;
        street_address:      string;
        city:                string;
        state:               string;
        zipcode:             string;
        country:             string;
  }
}

  export type Orders_db = {
    orders: [
        {
          id:                      bigint;
          tracking_number:         string;
          shipped_from_address_id: bigint;
          purchase_date:           Date;
          estimated_delivery_date: Date;
          product_id:              bigint;
          quantity:                number;
          customer_id:             bigint;
          total:                   number;
          product: {
              id:                  bigint;
              product_name:        string;
              price:               number;
              inventory_id:        bigint;
        },
          address: {
              id:                  bigint;
              street_address:      string;
              city:                string;
              state:               string;
              zipcode:             string;
              country:             string;
        }
      }
    ]
  }

  export type OrderSummary = {
    order: {
        orderDate:               string
        item:                    string
        trackingNumber:          string
        shippedFromAddress: {
            streetAddress:       string
            city:                string
            state:               string
            zipCode:             string
            country:             string
        }
        individualCost:          number
        quantity:                number
        totalCost:               number
    }
}