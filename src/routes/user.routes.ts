import { Router } from "express";
import AppError from "../errors/AppError";
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
userRouter.get("", authMiddleware, adminMiddleware, listUserController);
userRouter.get("/:id", authMiddleware, searchUserController);
userRouter.get("/:id/games");
userRouter.patch("/:id", authMiddleware, updateUserController);
userRouter.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteUserController
);

userRouter.get("/error", async (req, res) => {
  throw new AppError("Debug error route", 500);
});

export default userRouter;
