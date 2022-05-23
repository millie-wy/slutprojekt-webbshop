import { ErrorRequestHandler } from "express";
import mongoose, { Mongoose, MongooseError } from "mongoose";
import { MongoError } from "mongodb";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  if ((err as MongoError).code === 11000)
    return res
      .status(401)
      .json(
        "Your input value already exists in our database, change your input and try again."
      );
  if (err instanceof mongoose.Error.CastError)
    return Error(ErrorCodes.notFound);

  if (err.message === ErrorCodes.unauthorizedLogin) {
    res.status(401).json("You are not logged in.");
  } else if (err.message === ErrorCodes.unauthorizedEmail) {
    res.status(401).json("Invalid email");
  } else if (err.message === ErrorCodes.unauthorizedPassword) {
    res.status(401).json("Incorrect password");
  } else if (err.message === ErrorCodes.unauthorizedProduct) {
    res.status(401).json("Invalid product title");
  } else if (err.message === ErrorCodes.invalidInput) {
    res.status(401).json("Invalid input");
  } else if (err.message === ErrorCodes.accessDenied) {
    res.status(403).json("You are not permitted.");
  } else if (err.message === ErrorCodes.notFound) {
    res.status(404).json("Resource(s) not found.");
  } else {
    res.status(500).json(ErrorCodes.other);
  }
  next(err);
};

export const ErrorCodes = {
  invalidInput: "invalidInput",
  unauthorizedLogin: "unauthorizedLogin",
  unauthorizedEmail: "unauthorizedEmail",
  unauthorizedPassword: "unauthorizedPassword",
  unauthorizedProduct: "unauthorizedProduct",
  accessDenied: "accessDenied",
  notFound: "notFound",
  other: "other",
} as const;
