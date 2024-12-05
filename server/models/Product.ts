import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
    name : string,
    price: number,
    description?: string,
    category?: string, 
    stock: number
}

const ProductSchema = new mongoose.Schema({
    name: {type: String, required : true},
    price: {type: Number, required : true}, 
    description : {type: String},
    category: {type: String},
    stock : {type: Number, required : true}
})

export default mongoose.model<IProduct>('Product', ProductSchema)