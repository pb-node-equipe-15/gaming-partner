import { Router } from "express";

const gamesRouter = Router();

gamesRouter.post("");
gamesRouter.get("");
gamesRouter.patch("/:id");
gamesRouter.delete("/games/:idUser");
gamesRouter.get("/:id/games");

export default gamesRouter;
