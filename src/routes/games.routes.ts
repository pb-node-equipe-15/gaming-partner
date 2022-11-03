import { Router } from "express";
import { createGameController } from "../controllers/games.controller";
import adminMiddleware from "../middlewares/admin.midleware";
import { authMiddleware } from "../middlewares/auth.midleware";

const gamesRouter = Router();

gamesRouter.post("", authMiddleware, adminMiddleware, createGameController);
gamesRouter.get("");
gamesRouter.patch("/:id");
gamesRouter.delete("/games/:idUser");
gamesRouter.get("/:id/games");

export default gamesRouter;
