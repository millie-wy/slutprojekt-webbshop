import mongoose from "mongoose";

export interface DeliveryOption {
  provider: string;
  estTime: string; // estimated time for delivery
  cost: number;
}

export const deliveryOptionSchema = new mongoose.Schema({
  provider: { type: String, required: true },
  estTime: { type: String, required: true },
  cost: { type: Number, required: true },
});
