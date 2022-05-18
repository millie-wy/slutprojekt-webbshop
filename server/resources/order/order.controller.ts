import { NextFunction, Request, Response } from "express";
import { User } from "../user";
import { Order, OrderModel } from "./order.model";

export const getAllOrders = async (req: Request, res: Response) => {
  // TODO: who is allowed to use this endpoint?
  const orders = await OrderModel.find({}).populate<{ customer: User }>(
    "customer"
  );
  // orders[0].customer.
  res.status(200).json(orders);
};

export const addOrder = async (
  req: Request<{}, {}, Order>,
  res: Response,
  next: NextFunction
) => {
  // TODO: how do we handle errors in async middlewares?
  try {
    const order = new OrderModel(req.body);
    await order.save();
    // console.log(order);
    // const errors = order.validateSync();
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const order = await OrderModel.findById(req.params.id).select("+password");
  console.log(order);
  res.status(200).json("UPDATED order WITH ID :" + req.params.id);
};

export const deleteOrder = (req: Request, res: Response) => {
  res.status(200).json("DELETED ORDER");
};
