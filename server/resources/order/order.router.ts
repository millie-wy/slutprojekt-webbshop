import express from "express";
import { addOrder, getAllOrders, updateOrder } from "./order.controller";
import { adminOnly, auth } from "../../middleware";

export const orderRouter = express
  .Router()
  .get("/", auth, adminOnly, getAllOrders)
  .post("/", auth, addOrder)
  .put("/:id", auth, adminOnly, updateOrder);
