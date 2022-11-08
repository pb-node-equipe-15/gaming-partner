import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";

import { IGamerCreate, IUpdateGame } from "../interfaces";
import createGameService from "../services/Games/createGames.service";
import deleteGameService from "../services/Games/deleteGame.service";
import listGamesService from "../services/Games/listGames.service";
import updateGameService from "../services/Games/updateGame.service";
import unsubscribeGameService from "../services/Games/unsubscribeGame.service";
import seachUsersGameService from "../services/Games/seachUsersGame.service";

const createGameController = async (req: Request, res: Response) => {
  const game: IGamerCreate = req.body;
  const createdGame = await createGameService(game);
  return res.status(201).json(instanceToPlain(createdGame));
};

const listGamesController = async (req: Request, res: Response) => {
  const games = await listGamesService();
  return res.json(instanceToPlain(games));
};

const updateGameController = async (req: Request, res: Response) => {
  const game: IUpdateGame = req.body;
  const id: string = req.params.id;
  const updatedGame = await updateGameService(game, id);
  return res.status(201).json(updatedGame);
};
const deleteGameController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const game = await deleteGameService(id);
  return res.status(200).json(`${game.name} has been deleted`);
};

const unsubscribeGameController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const idUser: string = req.users.id;
  await unsubscribeGameService(id, idUser);
  return res.status(201).json({ message: "successfully unsubscribed" });
};

const seachUsersGameController = async (req: Request, res: Response) => {
  const idGame = req.params.id;

  const players = await seachUsersGameService(idGame);

  return res.status(200).json(players);
};

export {
  createGameController,
  listGamesController,
  deleteGameController,
  unsubscribeGameController,
  updateGameController,
  seachUsersGameController,
};
