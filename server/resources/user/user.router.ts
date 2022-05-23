import express from "express";
import { adminOnly, auth } from "../../middleware";
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
  .get("/", auth, getAllUsers)
  .post("/", addUser)
  .put("/:id", updateUser)

  // below are for sign in/out
  .post("/login", signIn)
  .delete("/logout", signOut)
  .get("/login", getCookieSession);
