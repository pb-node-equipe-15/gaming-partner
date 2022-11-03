import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IUserCreate } from "../interfaces";
import createUserService from "../services/users/createUser.service";

import AppError from "../errors/AppError";
import deleteUserService from "../services/users/deleteUser.service";

const createUserController = async (req: Request, res: Response) => {
  const user: IUserCreate = req.body;
  const createdUser = await createUserService(user);
  return res.status(201).json(instanceToPlain(createdUser));
};

const deleteUserController = async (req: Request, res: Response) => {
    const id:string = req.params.id;
    await deleteUserService(id);
    return res.status(204).json({ message: 'User deleted with success!' });
};

export  {createUserController, deleteUserController} ;
