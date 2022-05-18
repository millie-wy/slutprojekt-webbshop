import express from "express";
import {
  addOrder,
  deleteOrder,
  getAllOrders,
  updateOrder,
} from "./order.controller";

export const orderRouter = express
  .Router()
  .get("/", /* adminSecure,*/ getAllOrders)
  .post("/", addOrder)
  .put("/:id", updateOrder)
  .delete("/:id", deleteOrder);
