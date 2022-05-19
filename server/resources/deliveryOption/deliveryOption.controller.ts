import { NextFunction, Request, Response } from "express";
import { DeliveryOptionModel, DeliveryOption } from "./deliveryOption.model";

export const getAllDeliveryOptions = async (req: Request, res: Response) => {
  // TODO: who is allowed to use this endpoint?
  const deliveryOptions = await DeliveryOptionModel.find({});
  res.status(200).json(deliveryOptions);
};

export const addDeliveryOption = async (
  req: Request<{}, {}, DeliveryOption>,
  res: Response,
  next: NextFunction
) => {
  // TODO: how do we handle errors in async middlewares?
  try {
    const deliveryOption = new DeliveryOptionModel(req.body);
    await deliveryOption.save();
    // console.log(deliveryOption);
    // const errors = deliveryOption.validateSync();
    res.status(200).json(deliveryOption);
  } catch (err) {
    next(err);
  }
};

export const updateDeliveryOption = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const deliveryOption = await DeliveryOptionModel.findById(req.params.id).select("+password");
  console.log(deliveryOption);
  res.status(200).json("UPDATED USER WITH ID :" + req.params.id);
};

export const deleteDeliveryOption = (req: Request, res: Response) => {
  res.status(200).json("DELETED USER");
};
