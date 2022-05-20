import mongoose from "mongoose";

export interface Product {
  title: string;
  description: string;
  category: string[];
  price: number;
  quantity: number;
  image: string; // string for now...
}

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: [String], required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true }, // for now
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    strict: "throw",
  }
  // whether the the virtual values will also be saved in db
);

export const ProductModel = mongoose.model<Product>("product", productSchema);
