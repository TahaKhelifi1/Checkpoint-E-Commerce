import IProduct from "./product";


export interface IProductQuantity{
    product: string | IProduct,
    quantity: number
}

export default interface IBasket { 
    _id?: string,
    userName: string,
    products : IProductQuantity[] ,
    total: number
}
