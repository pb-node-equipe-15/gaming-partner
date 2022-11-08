import { Router } from "express";

import {
  createGameController,
  deleteGameController,
  listGamesController,
  seachUsersGameController,
  unsubscribeGameController,
  updateGameController,
} from "../controllers/games.controller";
import adminMiddleware from "../middlewares/admin.midleware";
import { authMiddleware } from "../middlewares/auth.midleware";

const gamesRouter = Router();

gamesRouter.post("", createGameController);
gamesRouter.get("", listGamesController);
gamesRouter.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateGameController
);
gamesRouter.patch(
  "/unsubscribe/:id",
  authMiddleware,
  unsubscribeGameController
);
gamesRouter.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteGameController
);
gamesRouter.get("/:id/games");
gamesRouter.get("/:id/users", seachUsersGameController);

export default gamesRouter;
