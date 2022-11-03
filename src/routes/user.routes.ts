import { Router } from "express";
import { createUserController, deleteUserController } from "../controllers/users.controller";
import adminMiddleware from "../middlewares/admin.midleware";
import { authMiddleware } from "../middlewares/auth.midleware";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("");
userRouter.patch("/:id");
userRouter.delete("/:id", authMiddleware, adminMiddleware, deleteUserController);
userRouter.get("/:id/games");

export default userRouter;
