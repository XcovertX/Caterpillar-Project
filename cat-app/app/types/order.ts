export type Order_db =         
{
  id:                      bigint;
  tracking_number:         string;
  shipped_from:            string;
  purchase_date:           Date;
  estimated_delivery_date: Date;
  item_id:                 bigint;
  item_quantity:           number;
  customer_id:             number;
  item: {
      id:                  bigint;
      name:                string;
      price:               number;
      manufactured_from:   string;
  }
}

  export type Orders_db = {
    orders: [
        {
          id:                      bigint;
          tracking_number:         string;
          shipped_from:            string;
          purchase_date:           Date;
          estimated_delivery_date: Date;
          item_id:                 bigint;
          item_quantity:           number;
          customer_id:             number;
          item: {
              id:                  bigint;
              name:                string;
              price:               number;
              manufactured_from:   string;
        }
      }
    ]
  }

  export type OrderSummary = {
    order: {
      id:                      number
      orderDate:               string
      etaDate:                 string
      item:    {
        id:                    number
        name:                  string
        price:                 number
      }
      trackingNumber:          string
      shippedFromAddress:      string
      itemQuantity:           number
      totalCost:               number
    }
}