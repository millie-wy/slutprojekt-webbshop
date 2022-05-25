import mongoose from "mongoose";

export interface Address {
  street: string;
  zipCode: number;
  city: string;
}

export const addressSchema = new mongoose.Schema(
  {
    street: { type: String, required: true, minlength: 5, maxlength: 45 },
    zipCode: { type: Number, required: true, min: 10000, max: 99999 },
    city: { type: String, required: true, maxlength: 30 },
  },
  { strict: "throw", _id: false }
);
