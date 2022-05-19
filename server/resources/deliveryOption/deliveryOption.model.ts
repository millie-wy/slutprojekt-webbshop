import bcrypt from "bcrypt";
import mongoose from "mongoose";

export interface DeliveryOption {
  provider: string,
  cost: number,
  estTime: string, 
  logo: string,
}

const deliveryOptionSchema = new mongoose.Schema(
  {
    provider: { type: String, required: true },
    cost: { type: Number, required: true },
    estTime: { type: String, required: true },
    logo: { type: String, required: false,  },
    },  
);

export const DeliveryOptionModel = mongoose.model<DeliveryOption>("deliveryOption", deliveryOptionSchema);
