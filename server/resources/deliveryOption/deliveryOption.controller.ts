import { Request, Response } from "express";
import { ErrorCodes } from "../../errorRequestHandler";
import { DeliveryOption, DeliveryOptionModel } from "./deliveryOption.model";
require("express-async-errors");

export const getAllDeliveryOptions = async (req: Request, res: Response) => {
  const deliveryOptions = await DeliveryOptionModel.find({});
  if (!deliveryOptions) throw Error(ErrorCodes.other);
  res.status(200).json(deliveryOptions);
};

export const addDeliveryOption = async (
  req: Request<{}, {}, DeliveryOption>,
  res: Response
) => {
  const newOption = await DeliveryOptionModel.create(req.body);
  res.status(200).json(newOption);
};
