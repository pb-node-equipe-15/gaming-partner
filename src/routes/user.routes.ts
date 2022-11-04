import { Router } from "express";

import {
  createUserController,
  deleteUserController,
  listUserController,
  searchUserController,
  updateUserController,
} from "../controllers/users.controller";
import adminMiddleware from "../middlewares/admin.midleware";
import { authMiddleware } from "../middlewares/auth.midleware";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("", authMiddleware, listUserController);
userRouter.get("/:id", authMiddleware, searchUserController);
userRouter.patch("/:id", authMiddleware, updateUserController);
userRouter.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteUserController
);
userRouter.get("/:id/games");

export default userRouter;
