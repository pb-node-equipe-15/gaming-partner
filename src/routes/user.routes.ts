import { Router } from "express";
import { createUserController } from "../controllers/users.controller";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("");
userRouter.patch("/:id");
userRouter.delete("/:id");
userRouter.get("/:id/games");

export default userRouter;
