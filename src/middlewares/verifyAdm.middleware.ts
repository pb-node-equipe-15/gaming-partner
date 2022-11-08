import { NextFunction, Request, Response } from "express";

const verifyAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.isAdm) {
    return res.status(403).json({
      message: "User is not admim",
    });
  }
  return next();
};

export default verifyAdmMiddleware;
