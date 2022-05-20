import { Request, Response } from "express";
import { DeliveryOptionModel } from "./deliveryOption.model";

export const getAllDeliveryOptions = async (req: Request, res: Response) => {
  // TODO: who is allowed to use this endpoint?
  const deliveryOptions = await DeliveryOptionModel.find({});
  res.status(200).json(deliveryOptions);
};
