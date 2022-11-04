import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IUserCreate, IUserUpdateRequest } from "../interfaces";

import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUserService from "../services/users/listUser.service";
import searchUserService from "../services/users/searchUser.service";
import updateUserService from "../services/users/updateUser.service";

const createUserController = async (req: Request, res: Response) => {
  const user: IUserCreate = req.body;
  const createdUser = await createUserService(user);
  return res.status(201).json(instanceToPlain(createdUser));
};

const updateUserController = async (req: Request, res: Response) => {
  const user: IUserUpdateRequest = req.body;
  const id: string = req.params.id;
  const token = req.users.id;
  const updatedUser = await updateUserService(user, id, token);
  return res.status(200).json(updatedUser);
};

const deleteUserController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  await deleteUserService(id);
  return res.status(200).json({ message: "User deleted with success!" });
};

const searchUserController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const user = await searchUserService(id);
  return res.status(200).json(instanceToPlain(user));
};

const listUserController = async (req: Request, res: Response) => {
  const users = await listUserService();
  return res.status(200).json({ users });
};

export {
  createUserController,
  deleteUserController,
  listUserController,
  searchUserController,
  updateUserController,
};
