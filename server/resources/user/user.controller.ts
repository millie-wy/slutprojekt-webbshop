import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { castErrorDB } from "../../errorRequestHandler";
import { User, UserModel } from "./user.model";
require("express-async-errors");

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserModel.find({}).select("+password");
  if (!users) throw Error("not found");
  res.status(200).json(users);
  // TODO: who is allowed to use this endpoint?
};

// create new user
export const addUser = async (req: Request<{}, {}, User>, res: Response) => {
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
    return res.json("New user created");
    // const errors = user.validateSync();
  } catch (err: any) {
    if (err.code == 11000) throw Error("unauthorized_email");
    throw Error("other");
  }
};

// update user
export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  let { firstname, lastname, email, password, isAdmin } = req.body;
  let user = await UserModel.findById(req.params.id);
  console.log(user);
  castErrorDB; // this line is not working

  if (firstname) user!.firstname = firstname;
  if (lastname) user!.lastname = lastname;
  if (email) user!.email = email;
  if (password) user!.password = await bcrypt.hash(password, 10);
  if (isAdmin) user!.isAdmin = isAdmin;
  await UserModel.updateOne({ _id: req.params.id }, user!);
  res.status(200).json("Updated user with ID: " + req.params.id);
};

// sign in
export const signIn = async (req: Request, res: Response) => {
  const user = await UserModel.findOne({ email: req.body.email }).select(
    "+password"
  );
  if (!user) throw Error("unauthorized_email");

  const matchPw = await bcrypt.compare(req.body.password, user.password);
  if (!matchPw) throw Error("unauthorized_password");

  (user as any).password = undefined;
  req.session!.user = user;
  return res.status(200).json(user);
};

// sign out
export const signOut = async (req: Request<{ id: string }>, res: Response) => {
  if (!req.session?.user) throw Error("unauthorized_login");
  req.session = null;
  res.status(200).json("You are logged out.");
};

// return the information stored in the cookie - for testing
export const getCookieSession = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  if (!req.session?.user) throw Error("unauthorized_login");
  res.status(200).json(req.session);
};
