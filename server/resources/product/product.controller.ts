import { Request, Response } from "express";
import { ErrorCodes } from "../../errorRequestHandler";
import { Product, ProductModel } from "./product.model";
require("express-async-errors");

// get full product list from product db
export const getAllProducts = async (req: Request, res: Response) => {
  const products = await ProductModel.find({});
  if (!products) throw Error(ErrorCodes.notFound);
  res.status(200).json(products);
};

// get one specific product from product db
export const getOneProduct = async (req: Request, res: Response) => {
  const product = await ProductModel.findById(req.params.id);
  if (!product) throw Error(ErrorCodes.notFound);
  res.status(200).json(product);
};

// add a new product to product db
export const addProduct = async (
  req: Request<{}, {}, Product>,
  res: Response
) => {
  const product = await ProductModel.create({ ...req.body, quantity: 0 });
  // const errors = product.validateSync();
  res.status(200).json(product);
};

// update a product
export const updateProduct = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  let { title, description, category, price, quantity, image } = req.body;
  const updatingProduct = await ProductModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  if (!updatingProduct) throw Error(ErrorCodes.notFound);
  // MongooseError.StrictModeError ??
  if (title) updatingProduct!.title = title;
  if (description) updatingProduct!.description = description;
  if (category) updatingProduct!.category = category;
  if (price) updatingProduct!.price = price;
  if (quantity) updatingProduct!.quantity = quantity;
  if (image) updatingProduct!.image = image;
  res.status(200).json("Updated product with ID :" + req.params.id);
};

// delete a product from the product db
export const deleteProduct = async (req: Request, res: Response) => {
  const product = await ProductModel.findByIdAndDelete(req.params.id);
  if (!product) throw Error(ErrorCodes.notFound);
  res.status(200).json("Deleted product :" + req.params.id);
};
