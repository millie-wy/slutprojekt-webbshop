import express from "express";
import { addOrder, getAllOrders, updateOrder } from "./order.controller";
import { adminOnly, auth } from "../../middleware";

export const orderRouter = express
  .Router()
  .get("/", adminOnly, getAllOrders)
  .post("/", auth, addOrder)
  .put("/:id", adminOnly, updateOrder);
