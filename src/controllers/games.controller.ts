import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import Games from "../entities/games.intities";
import { IGamerCreate, IUpdateGame } from "../interfaces";
import createGameService from "../services/Games/createGames.service";
import deleteGameService from "../services/Games/deleteGame.service";
import listGamesService from "../services/Games/listGames.service";
import updateGameService from "../services/Games/updateGame.service";

const createGameController = async (req: Request, res: Response) => {
  const game: IGamerCreate = req.body;
  const createdGame = await createGameService(game);
  return res.status(201).json(instanceToPlain(createdGame));
};

const listGamesController = async (req: Request, res: Response) => {
  try {
    const games = await listGamesService();

    return res.send(instanceToPlain(games));
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({
        error: error.name,
        message: error.message,
      });
    }
  }
};

const updateGameController = async (req: Request, res: Response) => {
  const game: IUpdateGame = req.body;
  const id: string = req.params.id;
  const updatedGame = await updateGameService(game, id);
  return res.json(updatedGame);
};

const deleteGameController = async (req: Request, res: Response) => {
  const id = req.params.id;

  const game = await deleteGameService(id);

  return res.status(200).send(game);
};

export {
  createGameController,
  listGamesController,
  updateGameController,
  deleteGameController,
};
