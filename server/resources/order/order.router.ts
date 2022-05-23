import express from "express";
import { addOrder, getAllOrders, updateOrder } from "./order.controller";

export const orderRouter = express
  .Router()
  .get("/", /* adminSecure,*/ getAllOrders)
  .post("/", addOrder)
  .put("/:id", updateOrder);
