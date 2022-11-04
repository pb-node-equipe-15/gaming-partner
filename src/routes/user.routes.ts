import { Router } from "express";

import {
    addGamesUser,
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
userRouter.post("/add", authMiddleware, addGamesUser);
userRouter.get("", authMiddleware, listUserController);
userRouter.get("/:id", authMiddleware, searchUserController);
userRouter.get("/:id/games");
userRouter.patch("/:id", authMiddleware, updateUserController);
userRouter.delete("/:id", authMiddleware, adminMiddleware, deleteUserController);

export default userRouter;
