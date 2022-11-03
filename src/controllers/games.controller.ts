import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IGamerCreate } from "../interfaces";
import createGameService from "../services/Games/createGames.service";
import deleteGameService from "../services/Games/deleteGame.service";
import listGamesService from "../services/Games/listGames.service";

const createGameController = async (req: Request, res: Response) => {
  const game: IGamerCreate = req.body;
  const createdGame = await createGameService(game);
  return res.status(201).json(instanceToPlain(createdGame));
};

const listGamesController = async (req: Request, res: Response) => {
    const games = await listGamesService();
    return res.json(instanceToPlain(games));
};

const deleteGameController = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const game = await deleteGameService(id);
    return res.status(200).json(`${game.name} has been deleted`);
};

export { createGameController, listGamesController, deleteGameController };
