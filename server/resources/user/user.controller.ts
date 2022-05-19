import { NextFunction, Request, Response } from "express";
import { userInfo } from "os";
import { UserModel, User } from "./user.model";




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
      password: req.body.password
    });
    user.isAdmin
    await user.save();
    return res.json("new user created")
    // console.log(user);
    console.log(user.fullname);
    // const errors = user.validateSync();
    res.status(200).json(user);
  } catch (err: any) {
    if  (err.code == 1100)
      return res.status(401).json("email does already exist")
    res.status(500).json(err.message)
  }
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try{

    let { firstname, lastname, email, password, isAdmin } = req.body;
    let user = await UserModel.findByIdAndUpdate(req.params.id, req.body).select("+password")
    if (firstname) user!.firstname = firstname;
    if (lastname) user!.lastname = lastname;
    if (email) user!.email = email;
    if (password) user!.password = password;
    if (isAdmin) user!.isAdmin = isAdmin;
    console.log(user)
    
    res.status(200).json("UPDATED USER WITH ID :" + req.params.id);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json(err.message);
    }
  }
};

export const deleteUser = (req: Request, res: Response) => {
  res.status(200).json("DELETED USER");
};
