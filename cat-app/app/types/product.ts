export type Products = {
    products: Product[]
}

export type Product = {
    id:               bigint;
    name:             string;
    price:            number;
    manufacturedFrom: string
    quantity?: number 
}

export type Products_db = {
    products:
    [
        {
            id:                bigint;
            name:              string;
            price:             number;
            manufactured_from: string
            quantity?: number
        }
    ]
}

export type Product_db = {
    id:                bigint;
    name:              string;
    price:             number;
    manufactured_from: string
    quantity?: number
}