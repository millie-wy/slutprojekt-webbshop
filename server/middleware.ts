import { Request, Response, NextFunction } from "express";

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
