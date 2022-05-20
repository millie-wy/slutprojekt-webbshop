import { Address } from "cluster";
import mongoose, { Schema, Types } from "mongoose";
import { Product } from "../product";
import { DeliveryOption } from "../schema/deliveryOption.schema";

export interface Order {
  customer: Types.ObjectId;
  deliveryAddress: Address;
  deliveryOption: DeliveryOption;
  phoneNumber: Number;
  products: Product[];
  orderDate: Date; // it was createdAt, we are not sure if the time stamp works after changing name
}

const orderSchema = new mongoose.Schema(
  {
    // TODO: adjust all these
    customer: { type: Schema.Types.ObjectId, ref: "user", required: true },
    products: { type: [String], required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    strict: "throw",
  }
  // whether the the virtual values will also be saved in db
);

export const OrderModel = mongoose.model<Order>("order", orderSchema);
