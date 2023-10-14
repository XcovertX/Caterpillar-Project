export interface Order {
    orderId: number;
    customerId: number;
    cardNumber: string;
    cardType: string;
    trackingNumber: string;
    purchaseDate: Date;
    estimatedDelivery: Date;
    itemAmount: number;
}

export interface OrderItem {
    orderItemId: number;
    orderId: number;
    productId: number;
  }