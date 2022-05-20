import { Request, Response } from "express";
import { DeliveryOptionModel } from "./deliveryOption.model";
require("express-async-errors");

export const getAllDeliveryOptions = async (req: Request, res: Response) => {
  // TODO: who is allowed to use this endpoint?
  const deliveryOptions = await DeliveryOptionModel.find({});
  if (!deliveryOptions) throw Error("other");
  res.status(200).json(deliveryOptions);
};
