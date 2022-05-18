import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "./product.controller";

export const productRouter = express
  .Router()
  .get("/", /* adminSecure,*/ getAllProducts)
  .post("/", addProduct)
  .put("/:id", updateProduct)
  .delete("/:id", deleteProduct);
