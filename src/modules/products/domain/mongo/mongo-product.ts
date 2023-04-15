import { Schema, model } from 'mongoose';
import { IProduct } from '../iproduct';


const Product_Schema = new Schema<IProduct>({
    name: String,
    description: String,
    price: Number,
    stock: Number
});

export const Product = model('Product', Product_Schema);