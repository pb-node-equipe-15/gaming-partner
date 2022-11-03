import { Router } from "express";
import { deleteUserController } from "../controllers/deleteUser.controller";
import adminMiddleware from "../middlewares/admin.midleware";
import { authMiddleware } from "../middlewares/auth.midleware";

const userRouter = Router();

userRouter.post("");
userRouter.get("");
userRouter.patch("/:id");
userRouter.delete("/:id", authMiddleware, adminMiddleware, deleteUserController);
userRouter.get("/:id/games");

export default userRouter;
