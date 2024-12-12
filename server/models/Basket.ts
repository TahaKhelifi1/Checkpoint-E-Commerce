import mongoose, { Document, Schema } from "mongoose";
import { IProduct } from "./Product";

export interface IProductQuantity extends Document{
    product: string,
    quantity: number
}

export interface IBasket extends Document {
    userName: string, 
    products: IProductQuantity[], 
    total: number
}

const ProductQuantitySchema = new Schema<IProductQuantity>({
    product: { type: String, required: true }, // Reference to Product model
    quantity: { type: Number, required: true },
});

const BasketSchema = new Schema({
    userName: {type:String, required : true},
    products: { type: [ProductQuantitySchema], default: [] },
    total: {type: Number, required: true, default :0}
})

export default mongoose.model<IBasket>('Basket', BasketSchema)