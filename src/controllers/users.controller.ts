import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";

import { IUserCreate } from "../interfaces";
import addGamesUserService from "../services/users/addGamesUser.service";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUserService from "../services/users/listUser.service";
import searchUserService from "../services/users/searchUser.service";

const createUserController = async (req: Request, res: Response) => {
  const user: IUserCreate = req.body;
  const createdUser = await createUserService(user);
  return res.status(201).json(instanceToPlain(createdUser));
};

const deleteUserController = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    await deleteUserService(id);
    return res.status(200).json({ message: 'User deleted with success!' });
};

const searchUserController =async (req: Request, res: Response) => {
    const id: string = req.params.id
    const user = await searchUserService(id)
    return res.status(200).json(instanceToPlain(user))
}

const listUserController = async (req: Request, res: Response) => {
    const users = await listUserService()
    return res.status(200).json(instanceToPlain(users))
}

const addGamesUser = async (req: Request, res: Response) => {
    const idUser : string = req.users.id
    console.log("aqui o id " + idUser)
    const idGame: string = req.body.games
    addGamesUserService(idGame, idUser)
    return res.status(201).json({message: 'Games add'})
}

export  {createUserController, deleteUserController,listUserController, searchUserController, addGamesUser} ;

