import express from "express";
import mongoose from "mongoose";
import { userRouter, orderRouter, productRouter, deliveryOptionRouter } from "./resources";

const app = express();

// add global middlewares
app.use(express.json());

// add routers
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/product", productRouter);
app.use("/api/deliveryOption", deliveryOptionRouter );

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
