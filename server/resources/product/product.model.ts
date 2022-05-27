import mongoose, { Schema, Types } from "mongoose";

export interface Product {
  title: string;
  description: string;
  category: string[];
  price: number;
  stock?: number;
  quantity: number;
  imageId: Types.ObjectId;
  /* Virtual */ imageUrl: string;
}

export const productSchema = new mongoose.Schema<Product>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: [String], required: true },
    price: { type: Number, required: true },
    stock: { type: Number },
    quantity: { type: Number },
    imageId: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    strict: "throw",
  }
);

productSchema.virtual("imageUrl").get(function () {
  return "/api/media/" + this.imageId;
});

export const ProductModel = mongoose.model("product", productSchema);
