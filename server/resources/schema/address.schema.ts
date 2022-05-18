import mongoose from "mongoose";

export interface Address {
  street: string;
  zipCode: number;
  city: string;
}

export const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  zipCode: { type: Number, required: true },
  city: { type: String, required: true },
});
