import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.message === "unauthorized_login") {
    res.status(401).json("You are not logged in.");
  } else if (err.message === "unauthorized_email") {
    res.status(401).json("Invalid email");
  } else if (err.message === "unauthorized_password") {
    res.status(401).json("Incorrect password");
  } else if (err.message === "unauthorized_proudct") {
    res.status(401).json("Invalid product title");
  } else if (err.message === "access denied") {
    res.status(403).json("You are not permitted.");
  } else if (err.message === "not found") {
    res.status(404).json("Resource(s) not found.");
  } else if (err.message === "other") {
    res.status(500).json("Other error");
  }
  next(err);
};

export const castErrorDB = (err: any) => {
  console.log("Called");
  console.log("ERROR NAME: ", err.name);
  if (err instanceof mongoose.Error.CastError) return new Error("not found");
  throw Error("other");
};
