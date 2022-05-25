import express from "express";
import {
  addDeliveryOption,
  getAllDeliveryOptions,
} from "./deliveryOption.controller";

export const deliveryOptionRouter = express
  .Router()
  .get("/", getAllDeliveryOptions)
  .post("/", addDeliveryOption);
