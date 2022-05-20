import { NextFunction, Request, Response } from "express";
import { User, UserModel } from "./user.model";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json(err.message);
    }
  }
  // TODO: who is allowed to use this endpoint?
};

export const addUser = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction
) => {
  // TODO: how do we handle errors in async middlewares?
  try {
    const user = new UserModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    });
    user.isAdmin;
    await user.save();
    return res.json("new user created");
    // const errors = user.validateSync();
  } catch (err: any) {
    if (err.code == 1100)
      return res.status(401).json("email does already exist");
    res.status(500).json(err.message);
  }
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    let { firstname, lastname, email, password, isAdmin } = req.body;
    let user = await UserModel.findById(req.params.id).select("+password");
    if (firstname) user!.firstname = firstname;
    if (lastname) user!.lastname = lastname;
    if (email) user!.email = email;
    if (password) user!.password = password;
    if (isAdmin) user!.isAdmin = isAdmin;

    await UserModel.updateOne({ _id: req.params.id }, user!);
    res.status(200).json("UPDATED USER WITH ID :" + req.params.id);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json(err.message);
    }
  }
};
