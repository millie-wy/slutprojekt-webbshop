import { NextFunction, Request, Response } from "express";
import { ErrorCodes } from "../../errorRequestHandler";
import { User } from "../user";
import { Order, OrderModel } from "./order.model";
require("express-async-errors");

// get all orders
export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await OrderModel.find({}).populate<{ customer: User }>(
    "customer"
  );
  if (!orders) throw Error(ErrorCodes.notFound);
  res.status(200).json(orders);
};

// create a new order
export const addOrder = async (req: Request<{}, {}, Order>, res: Response) => {
  const order = await OrderModel.create(req.body);
  // const errors = order.validateSync();
  res.status(200).json(order);
};

// update an order (only isShipped)
export const updateOrder = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  await OrderModel.findById(req.params.id);
  let { isShipped } = req.body;

  let order = await OrderModel.findByIdAndUpdate(req.params.id, req.body);
  if (!order) throw Error(ErrorCodes.notFound);

  if (isShipped) order!.isShipped = isShipped;
  res.status(200).json("Updated order with ID :" + req.params.id);
};
