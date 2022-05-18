import express from "express";
import {
  addUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "./user.controller";

export const userRouter = express
  .Router()
  .get("/", /* adminSecure,*/ getAllUsers)
  .post("/", addUser)
  .put("/:id", updateUser)
  .delete("/:id", deleteUser);
