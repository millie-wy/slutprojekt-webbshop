import express from "express";
import { getAllDeliveryOptions } from "./deliveryOption.controller";

export const deliveryOptionRouter = express
  .Router()
  .get("/", getAllDeliveryOptions);
