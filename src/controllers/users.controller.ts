import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';

import { IUserCreate, IUserUpdateRequest } from '../interfaces';
import addGamesUserService from '../services/users/addGamesUser.service';
import conectUserService from '../services/users/conectUser.service';
import createUserService from '../services/users/createUser.service';
import deleteUserService from '../services/users/deleteUser.service';
import desconectUserService from '../services/users/desconectUser.service';
import listUserService from '../services/users/listUser.service';
import searchUserService from '../services/users/searchUser.service';
import updateUserService from '../services/users/updateUser.service';

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
  return res.status(201).json(instanceToPlain(updatedUser));
};

const deleteUserController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  await deleteUserService(id);
  return res.status(200).json({ message: 'User deleted with success!' });
};

const searchUserController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const user = await searchUserService(id);
  return res.status(200).json(instanceToPlain(user));
};

const listUserController = async (req: Request, res: Response) => {
  const adm: boolean = req.users.isAdm;
  const users = await listUserService(adm);
  return res.status(200).json(instanceToPlain(users));
};

const addGamesUser = async (req: Request, res: Response) => {
  const idUser: string = req.users.id;
  const idGame: string = req.body.gamesId;
  await addGamesUserService(idGame, idUser);
  return res.status(201).json({ message: 'Game added' });
};

const conectUsercontroller = async (req: Request, res: Response) => {
  const id: string = req.users.id;
  const idUser: string = req.body.id;
  const newFriend = await conectUserService(id, idUser);
  return res
    .status(201)
    .json({ message: `${newFriend} is now in your friend list` });
};

const desconectUsercontroller = async (req: Request, res: Response) => {
  const id: string = req.body.id;
  await desconectUserService(id);
  return res
    .status(201)
    .json({ message: `Friendship was successfully deleted` });
};

export {
  createUserController,
  deleteUserController,
  listUserController,
  searchUserController,
  addGamesUser,
  updateUserController,
  conectUsercontroller,
  desconectUsercontroller,
};
