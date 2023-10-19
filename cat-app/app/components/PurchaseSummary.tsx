
type OrderSummary = {
    order: {
        orderDate:               string
        item:                    string
        trackingNumber:          string
        shippedFromAddress: {
            id:                  bigint,
            streetAddress:      string,
            city:                string,
            state:               string,
            zipcode:             string
        }
        individualCost:          number
        quantity:                number
        totalCost:               number
    }
}

const Summary = ({ order }: OrderSummary) => {

}

export default Summary