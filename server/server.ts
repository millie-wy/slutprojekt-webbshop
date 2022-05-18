import express from "express";
import mongoose from "mongoose";
import { userRouter, orderRouter, productRouter } from "./resources";

const app = express();

// add global middlewares
app.use(express.json());

// add routers
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/product", productRouter);

mongoose.connect("mongodb:// write something", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connection to database established.");
    app.listen(3000, () =>
      console.log("Server is running on http://localhost:3000/")
    );
  }
});
