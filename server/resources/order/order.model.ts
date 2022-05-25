import { Address } from "cluster";
import mongoose, { Schema, Types } from "mongoose";
import { DeliveryOption, deliveryOptionSchema } from "../deliveryOption";
import { Product, productSchema } from "../product";
import { addressSchema } from "../schema/address.schema";

export interface Order {
  customer: Types.ObjectId;
  deliveryAddress: Address;
  deliveryOption: DeliveryOption;
  phoneNumber: number;
  products: Product[];
  isShipped?: boolean;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema<Order>(
  {
    customer: { type: Schema.Types.ObjectId, ref: "user", required: true },
    phoneNumber: { type: Number, required: true },
    isShipped: { type: Boolean, default: false },
    paymentMethod: { type: String, required: true },
    products: { type: [productSchema], required: true }, // should be another schema with qty required
    deliveryAddress: { type: addressSchema, required: true },
    deliveryOption: { type: deliveryOptionSchema, required: true },
  },
  {
    timestamps: true,
    strict: "throw",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const OrderModel = mongoose.model("order", orderSchema);
