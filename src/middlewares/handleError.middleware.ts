import { Request, Response, NextFunction } from "express";

import AppError from "../errors/AppError";

const handleErrorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }
  console.error(error);

  return res.status(500).json({
    message: "Internal server error!",
  });
};

export default handleErrorMiddleware;
