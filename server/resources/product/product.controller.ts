import { NextFunction, Request, Response } from "express";
import { Product, ProductModel } from "./product.model";

// get full product list from product db
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    // TODO: who is allowed to use this endpoint?
    const products = await ProductModel.find({});
    // below was to get the customer as well
    // const products = await ProductModel.find({}).populate<{ customer: User }>(
    //   "customer"
    // );
    res.status(200).json(products);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json(err.message);
    }
  }
};

// get one specific product from product db
export const getOneProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.status(200).json(product);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json(err.message);
    }
  }
};

// add a new product to product db
export const addProduct = async (
  req: Request<{}, {}, Product>,
  res: Response,
  next: NextFunction
) => {
  // TODO: how do we handle errors in async middlewares?
  try {
    const product = await ProductModel.create(req.body);
    // console.log(product);
    // const errors = product.validateSync();
    res.status(200).json(product);
  } catch (err: any) {
    if (err.code == 11000) {
      return res.status(403).json("Recipe title already exists.");
    }
    return res.status(500).json(err.message);
  }
};

// update a product
export const updateProduct = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    console.log(product);
    res.status(200).json("UPDATED PRODUCT WITH ID :" + req.params.id);
  } catch (err: unknown) {
    if (err instanceof Error) {
      // MongooseError.StrictModeError ??
      return res.status(500).json(err.message);
    }
  }
};

// delete a product from the product db
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.status(200).json("DELETED PRODUCT :" + req.params.id);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json(err.message);
    }
  }
};
