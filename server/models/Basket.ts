import mongoose, { Document, Schema } from "mongoose";
import { IProduct } from "./Product";

export interface IBasket extends Document {
    userName: String, 
    products: Array<productQuantity>, 
    total: Number
}

export interface productQuantity extends Document{
    product: IProduct,
    quantity: number
}

const BasketSchema = new Schema({
    userName: {type:String, required : true},
    products: {type: Array, default:[]},
    total: {type: Number, required: true}
})

export default mongoose.model<IBasket>('Basket', BasketSchema)