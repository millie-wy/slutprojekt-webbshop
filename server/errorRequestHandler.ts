import { ErrorRequestHandler } from "express";
import { MongoError } from "mongodb";
import mongoose from "mongoose";

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

  if (err.message === ErrorCodes.noImageSent) {
    res.status(400).json("No image file was sent.");
  } else if (err.message === ErrorCodes.unauthorizedLogin) {
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
  } else if (err.message === ErrorCodes.unsupportedImgFormat) {
    res.status(415).json("Unsupported image format");
  } else {
    res.status(500).json(ErrorCodes.other);
  }
  next(err);
};

export const ErrorCodes = {
  noImageSent: "noImageSent",
  invalidInput: "invalidInput",
  unauthorizedLogin: "unauthorizedLogin",
  unauthorizedEmail: "unauthorizedEmail",
  unauthorizedPassword: "unauthorizedPassword",
  unauthorizedProduct: "unauthorizedProduct",
  accessDenied: "accessDenied",
  notFound: "notFound",
  unsupportedImgFormat: "unsupportedImgFormat",
  other: "other",
} as const;
