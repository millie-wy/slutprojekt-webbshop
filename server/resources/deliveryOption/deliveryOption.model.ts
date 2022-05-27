import mongoose from "mongoose";

export interface DeliveryOption {
  provider: string;
  cost: number;
  estTime: string;
  logoId?: string;
  /* Virtual */ logoUrl?: string;
}

export const deliveryOptionSchema = new mongoose.Schema<DeliveryOption>(
  {
    provider: { type: String, required: true },
    cost: { type: Number, required: true },
    estTime: { type: String, required: true },
    logoId: { type: String, required: false },
  },
  { strict: "throw", toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

deliveryOptionSchema.virtual("logoUrl").get(function () {
  return "/api/media/" + this.logoId;
});

export const DeliveryOptionModel = mongoose.model(
  "deliveryOption",
  deliveryOptionSchema
);
