import express from "express";
import {
  addDeliveryOption,
  deleteDeliveryOption,
  getAllDeliveryOptions,
  updateDeliveryOption,
} from "./deliveryOption.controller";

export const deliveryOptionRouter = express
  .Router()
  .get("/", /* adminSecure,*/ getAllDeliveryOptions)
  .post("/", addDeliveryOption)
  .put("/:id", updateDeliveryOption)
  .delete("/:id", deleteDeliveryOption);
