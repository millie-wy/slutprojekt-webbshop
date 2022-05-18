import { NextFunction, Request, Response } from "express";
import { User } from "../user";
import { Product, ProductModel } from "./product.model";

export const getAllProducts = async (req: Request, res: Response) => {
  // TODO: who is allowed to use this endpoint?
  const products = await ProductModel.find({}).populate<{ customer: User }>(
    "customer"
  );
  // products[0].customer.
  res.status(200).json(products);
};

export const addProduct = async (
  req: Request<{}, {}, Product>,
  res: Response,
  next: NextFunction
) => {
  // TODO: how do we handle errors in async middlewares?
  try {
    const product = new ProductModel(req.body);
    await product.save();
    // console.log(product);
    // const errors = product.validateSync();
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const product = await ProductModel.findById(req.params.id).select(
    "+password"
  );
  console.log(product);
  res.status(200).json("UPDATED PRODUCT WITH ID :" + req.params.id);
};

export const deleteProduct = (req: Request, res: Response) => {
  res.status(200).json("DELETED ORDER");
};
