import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
    name : string,
    price: number,
    description?: string,
    category?: string, 
    stock: number,
    url?: string
}

const ProductSchema = new Schema({
    name: {type: String, required : true},
    price: {type: Number, required : true}, 
    description : {type: String},
    category: {type: String},
    stock : {type: Number, required : true},
    url : {type:String, required: false}
})

export default mongoose.model<IProduct>('Product', ProductSchema)