import express from "express";
import { auth } from "../../middleware";
import { addOrder, getAllOrders, updateOrder } from "./order.controller";

export const orderRouter = express
  .Router()
  .get("/", /* adminSecure,*/ getAllOrders)
  .post("/", auth, addOrder)
  .put("/:id", updateOrder);
