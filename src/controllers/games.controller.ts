import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IGamerCreate } from "../interfaces";
import createGameService from "../services/Games/createGames.service";

const createGameController = async (req: Request, res: Response) => {
  const game: IGamerCreate = req.body;
  const createdGame = await createGameService(game);
  return res.status(201).json(instanceToPlain(createdGame));
};

export { createGameController };
