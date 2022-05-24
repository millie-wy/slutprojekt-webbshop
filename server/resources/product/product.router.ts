import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
} from "./product.controller";

import { adminOnly, auth } from "../../middleware";

export const productRouter = express
  .Router()
  .get("/", getAllProducts)
  .get("/:id", getOneProduct)
  .post("/", auth, adminOnly, addProduct)
  .put("/:id", auth, adminOnly, updateProduct)
  .delete("/:id", auth, adminOnly, deleteProduct);
