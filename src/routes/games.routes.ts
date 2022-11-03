import { Router } from "express";
import {
  createGameController,
  deleteGameController,
  listGamesController,
} from "../controllers/games.controller";

const gamesRouter = Router();

gamesRouter.post("", createGameController);
gamesRouter.get("", listGamesController);
gamesRouter.patch("/:idGame");
gamesRouter.delete("/:idGame", deleteGameController);
gamesRouter.get("/:id/games");

export default gamesRouter;
