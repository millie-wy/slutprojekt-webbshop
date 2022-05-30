import { Request, Response } from "express";
import { ErrorCodes } from "../../errorRequestHandler";
import { Product, ProductModel } from "../product";
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
  // let founds: Product[] = [];
  // for (let i = 0; i < req.body.products.length; i++) {
  //   let found = await ProductModel.findById(req.body.products[i]._id).exec();
  //   founds.push(found!);
  // }
  // console.log(founds);

  // for (let orderProduct of req.body.products) {
  //   console.log(req.body.products);
  //   let findProduct = await ProductModel.findById(orderProduct._id);
  //   console.log(findProduct);
  // }
  req.body.products.map(async (product) => {
    // find the product based on the id in upcoming order
    let orderedProduct = await ProductModel.findById(product._id);
    if (!orderedProduct) throw Error(ErrorCodes.notFound);
    if (orderedProduct.stock! < product.quantity!)
      throw Error(ErrorCodes.notEnoughStock);

    // update product stock
    await ProductModel.findByIdAndUpdate(product._id, {
      $inc: { stock: -product.quantity! },
    });
  });

  const newOrder = await OrderModel.create({
    ...req.body,
    customer: req.session?.user,
  });
  res.status(200).json(newOrder);
};

// update an order (only isShipped)
export const updateOrder = async (
  req: Request<{ _id: string }>,
  res: Response
) => {
  await OrderModel.findById(req.params._id);
  let { isShipped } = req.body;

  let order = await OrderModel.findByIdAndUpdate(req.params._id, req.body);
  if (!order) throw Error(ErrorCodes.notFound);

  if (isShipped) order!.isShipped = isShipped;
  res.status(200).json("Updated order with ID :" + req.params._id);
};
