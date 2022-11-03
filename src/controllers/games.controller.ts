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

const deleteGameController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const game = await deleteGameService(id);

    return res.status(200).send(game);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(404).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export { createGameController, listGamesController, deleteGameController };
