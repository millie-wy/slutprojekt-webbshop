import cookieSession from "cookie-session";
import express from "express";
import mongoose from "mongoose";
import { errorHandler } from "./errorRequestHandler";
import {
  deliveryOptionRouter,
  mediaRouter,
  orderRouter,
  productRouter,
  userRouter,
} from "./resources";
require("express-async-errors");

const app = express();

// global middlewares
app.use(express.json());
app.use(
  cookieSession({
    secret: "1fjEknf3Fkd9p",
    sameSite: "strict",
    httpOnly: false,
    secure: false,
  })
);

// routers
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/product", productRouter);
app.use("/api/deliveryOption", deliveryOptionRouter);
app.use("/api/media", mediaRouter);

// error handler
app.use(errorHandler);

mongoose.connect(
  "mongodb+srv://millie:EKSxW2xFhesqUys@mycluster.kecdt.mongodb.net/CommeCiCommeCa",
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connection to database established.");
      app.listen(3001, () =>
        console.log("Server is running on http://localhost:3001/")
      );
    }
  }
);
