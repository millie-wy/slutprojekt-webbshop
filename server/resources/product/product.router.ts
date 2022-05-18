import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
} from "./product.controller";

export const productRouter = express
  .Router()
  .get("/", /* adminSecure,*/ getAllProducts)
  .get("/:id", getOneProduct)
  .post("/", addProduct)
  .put("/:id", updateProduct)
  .delete("/:id", deleteProduct);
