import { Router } from "express";
import {
  addCategoryController,
  addGamesToCategoryController,
  listCategoriesController,
} from "../controllers/category.controller";
import AppError from "../errors/AppError";
import adminMiddleware from "../middlewares/admin.midleware";
import { authMiddleware } from "../middlewares/auth.midleware";

const categoriesRouter = Router();

categoriesRouter.post(
  "",
  authMiddleware,
  adminMiddleware,
  addCategoryController
);
categoriesRouter.post(
  "/:id",
  authMiddleware,
  adminMiddleware,
  addGamesToCategoryController
);
categoriesRouter.get("", authMiddleware, listCategoriesController);

categoriesRouter.get("/error", async (req, res) => {
  throw new AppError("Debug error route", 500);
});

export default categoriesRouter;
