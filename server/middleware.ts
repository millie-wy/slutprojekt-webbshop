import { NextFunction, Request, Response } from "express";

// stop users that arent logged in
export const secure = (req: Request, res: Response, next: NextFunction) => {
  if (req.session?.user) {
    next();
  } else {
    res.status(401).json("You must login first.");
  }
};

// stop users that are not admin
export const adminSecure = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.user.isAdmin) {
    next();
  } else {
    res.status(403).json("You are not permitted.");
  }
};

/* SECURITY FUNCTIONS THAT WE CAN USE 

const validBody = async (req: Request, res: Response, next: NextFunction) => {
  await new UserModel(req.body).validate();
};

const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.user?.isAdmin) {
    throw new HttpError(403, "not permitted");
  }
  next();
};

const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.user) {
    throw new HttpError(401, "must login");
  }
  next();
};

const selfOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const user = await UserModel.findById(req.params.id);
  const isAdmin = req.session?.user?.isAdmin;
  const userOwnsContent = user && user?.id === req.session?.user?.id;

  if (!isAdmin && !userOwnsContent) {
    throw new HttpError(403, "not permitted");
  }
  next();
};
*/
