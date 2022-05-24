import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
} from "./product.controller";

import { adminOnly } from "../../middleware";

export const productRouter = express
  .Router()
  .get("/", getAllProducts)
  .get("/:id", getOneProduct)
  .post("/", adminOnly, addProduct)
  .put("/:id", adminOnly, updateProduct)
  .delete("/:id", adminOnly, deleteProduct);
