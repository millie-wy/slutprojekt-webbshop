import mongoose from "mongoose";

export interface DeliveryOption {
  provider: string;
  cost: number;
  estTime: string;
  logo: string;
}

export const deliveryOptionSchema = new mongoose.Schema<DeliveryOption>(
  {
    provider: { type: String, required: true },
    cost: { type: Number, required: true },
    estTime: { type: String, required: true },
    logo: { type: String, required: false },
  },
  { strict: "throw" }
);

export const DeliveryOptionModel = mongoose.model(
  "deliveryOption",
  deliveryOptionSchema
);
