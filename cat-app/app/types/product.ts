export type Products = {
    products: Product[]
}

export type Product = {
    id:          bigint;
    productName: string;
    price:       number;
    inventoryId: bigint;  
}

export type Products_db = {
    products:
    [
        {
            id:          bigint;
            product_name: string;
            price:       number;
            inventory_id: bigint;
        }
    ]
}

export type Product_db = {
    id:           bigint;
    product_name: string;
    price:        number;
    inventory_id: bigint;
}