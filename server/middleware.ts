import { NextFunction, Request, Response } from "express";
import { ErrorCodes } from "./errorRequestHandler";
import { UserModel } from "./resources";

// stop users that are not logged in
export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.user) throw Error(ErrorCodes.unauthorizedLogin);
  next();
};

// stop users that are not admin
export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.user.isAdmin) throw Error(ErrorCodes.accessDenied);
  next();
};

// stop users that are not the owner of the content or admin
export const selfOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await UserModel.findById(req.params.id);
  const admin = req.session?.user.isAdmin;
  const permittedUser = user && user.id === req.session?.user.id;

  if (!admin || !permittedUser) throw Error(ErrorCodes.accessDenied);
  next();
};

/* SECURITY FUNCTIONS THAT WE CAN USE 
const validBody = async (req: Request, res: Response, next: NextFunction) => {
  await new UserModel(req.body).validate();
};
*/
