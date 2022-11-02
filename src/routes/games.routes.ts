import { Router } from "express";
import { createGameController } from "../controllers/games.controller";

const gamesRouter = Router();

gamesRouter.post("", createGameController);
gamesRouter.get("");
gamesRouter.patch("/:id");
gamesRouter.delete("/games/:idUser");
gamesRouter.get("/:id/games");

export default gamesRouter;
