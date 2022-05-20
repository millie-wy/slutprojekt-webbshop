import express from "express";
import { get } from "mongoose";
import {
  addUser,
  getAllUsers,
  getCookieSession,
  signIn,
  signOut,
  updateUser,
} from "./user.controller";

export const userRouter = express
  .Router()
  .get("/", /* adminSecure,*/ getAllUsers)
  .post("/", addUser)
  .put("/:id", updateUser)

  // below are for sign in/out
  .post("/login", signIn)
  .delete("/logout", signOut)
  .get("/login", getCookieSession);
