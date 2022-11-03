import { Request, Response } from "express";
import AppError from "../errors/AppError";
import deleteUserService from "../services/deleteUser.service";

export const deleteUserController = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await deleteUserService(id);
      if (user) {
        return res.status(204).json();
      }
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).send({
          message: error.message
        });
      }
    }
};