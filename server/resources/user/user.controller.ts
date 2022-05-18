import { NextFunction, Request, Response } from "express";
import { userInfo } from "os";
import { UserModel, User } from "./user.model";

export const getAllUsers = async (req: Request, res: Response) => {
  // TODO: who is allowed to use this endpoint?
  const users = await UserModel.find({});
  res.status(200).json(users);
};

export const addUser = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction
) => {
  // TODO: how do we handle errors in async middlewares?
  try {
    const user = new UserModel(req.body);
    await user.save();
    // console.log(user);
    console.log(user.fullname);
    // const errors = user.validateSync();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const user = await UserModel.findById(req.params.id).select("+password");
  console.log(user);
  res.status(200).json("UPDATED USER WITH ID :" + req.params.id);
};

export const deleteUser = (req: Request, res: Response) => {
  res.status(200).json("DELETED USER");
};
