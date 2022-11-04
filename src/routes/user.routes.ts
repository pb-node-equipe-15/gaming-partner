import { Router } from "express";
import { createUserController } from "../controllers/users.controller";
import AppError from "../errors/AppError";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("");
userRouter.patch("/:id");
userRouter.delete("/:id");
userRouter.get("/:id/games");

userRouter.get("/error", async (req, res) => {
  throw new AppError("Debug error route", 500);
});

export default userRouter;
