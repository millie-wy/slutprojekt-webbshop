import { Address } from "cluster";
import mongoose, { Schema, Types } from "mongoose";
import { DeliveryOption } from "../deliveryOption";
import { Product } from "../product";
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
}

const orderSchema = new mongoose.Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "user", required: true },
    deliveryAddress: {
      type: addressSchema,
      required: true,
    },
    deliveryOption: {
      type: Schema.Types.ObjectId,
      ref: "deliveryOption",
      required: true,
    },
    phoneNumber: { type: Number, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "product", required: true }],
    isShipped: { type: Boolean, default: false },
    paymentMethod: { type: String, required: true },
  },
  {
    timestamps: true,
    strict: "throw",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const OrderModel = mongoose.model<Order>("order", orderSchema);
