import { Request, Response } from 'express';
import AppError from '../errors/AppError';
import { IUserLogin } from '../interfaces';
import createSessionService from '../services/session/loginUser.service';

const createSessionController = async (req: Request, res: Response) => {
  try {
    const { email, password }: IUserLogin = req.body;
    const token = await createSessionService({ email, password });
    return res.json({ token });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({
        message: error.message,
      });
    }
  }
};

export { createSessionController };
