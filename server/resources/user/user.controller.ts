import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { ErrorCodes } from "../../errorRequestHandler";
import { User, UserModel } from "./user.model";
require("express-async-errors");

// get all users from the user collection
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserModel.find({}).select("+password");
  if (!users) throw Error(ErrorCodes.notFound);
  res.status(200).json(users);
};

// create new user
export const addUser = async (req: Request<{}, {}, User>, res: Response) => {
  const user = new UserModel({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });
  user.isAdmin;
  await user.save();
  return res.json("New user created");
};

// update user
export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  let { firstname, lastname, email, password, isAdmin } = req.body;
  let user = await UserModel.findById(req.params.id);

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
  if (!user) throw Error(ErrorCodes.unauthorizedEmail);

  const matchPw = await bcrypt.compare(req.body.password, user.password!);
  if (!matchPw) throw Error(ErrorCodes.unauthorizedPassword);

  (user as any).password = undefined;
  req.session!.user = user;
  return res.status(200).json(user);
};

// sign out
export const signOut = async (req: Request<{ id: string }>, res: Response) => {
  if (!req.session?.user) throw Error(ErrorCodes.unauthorizedLogin);
  req.session = null;
  res.status(204).json(null);
};

// return the information stored in the cookie - for testing
export const getLoggedInUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {

 if (!req.session?.user) throw Error(ErrorCodes.unauthorizedLogin);
  const user = await UserModel.findOne({ _id: req.session.user._id });
  res.status(200).json(user);
};
