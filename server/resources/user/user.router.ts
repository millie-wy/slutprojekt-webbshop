import express from "express";
import { adminOnly, auth, selfOrAdmin } from "../../middleware";
import {
  addUser,
  getAllUsers,
  getLoggedInUser,
  signIn,
  signOut,
  updateUser,
} from "./user.controller";

export const userRouter = express
  .Router()
  .get("/", auth, adminOnly, getAllUsers)
  .post("/", addUser)
  .put("/:id", auth, selfOrAdmin, updateUser)

  // below are for sign in/out
  .post("/login", signIn)
  .delete("/logout", signOut)
  .get("/login", getLoggedInUser);
