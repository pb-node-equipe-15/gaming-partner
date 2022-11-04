import { Router } from "express";
import {
  createGameController,
  deleteGameController,
  listGamesController,
  updateGameController,
} from "../controllers/games.controller";

const gamesRouter = Router();

gamesRouter.post("", createGameController);
gamesRouter.get("", listGamesController);
gamesRouter.patch("/:id", updateGameController);
gamesRouter.delete("/:id", deleteGameController);
gamesRouter.get("/:id/games");

export default gamesRouter;
