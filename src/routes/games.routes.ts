import { Router } from "express";
import { createGameController } from "../controllers/games.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import verifyAdmMiddleware from "../middlewares/verifyAdm.middleware";

const gamesRouter = Router();

gamesRouter.post(
  "",
  ensureAuthMiddleware,
  verifyAdmMiddleware,
  createGameController
);
gamesRouter.get("");
gamesRouter.patch("/:id");
gamesRouter.delete("/games/:idUser");
gamesRouter.get("/:id/games");

export default gamesRouter;
