import { NextFunction, Request, Response } from "express";
import { User } from "../user";
import { Order, OrderModel } from "./order.model";
require("express-async-errors");

//** this function works but currently only the user object is shown in the get result, not the delivery option and products

// get all orders
export const getAllOrders = async (req: Request, res: Response) => {
  // TODO: who is allowed to use this endpoint?
  const orders = await OrderModel.find({}).populate<{ customer: User }>(
    "customer"
  );
  // orders[0].customer.
  if (!orders) throw Error("not found");
  res.status(200).json(orders);
};

// create a new order
export const addOrder = async (
  req: Request<{}, {}, Order>,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await OrderModel.create(req.body);
    // console.log(order);
    // const errors = order.validateSync();
    res.status(200).json(order);
  } catch (err) {
    throw Error("other");
  }
};

// update an order (only isShipped)
export const updateOrder = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  await OrderModel.findById(req.params.id);
  let { isShipped } = req.body;

  let order = await OrderModel.findByIdAndUpdate(req.params.id, req.body);
  if (!order) throw Error("not found"); // this line doesnt work for now

  if (isShipped) order!.isShipped = isShipped;
  res.status(200).json("UPDATED ORDER WITH ID :" + req.params.id);
};
