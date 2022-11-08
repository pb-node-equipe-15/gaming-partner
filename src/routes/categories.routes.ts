import { Router } from "express";
import {
  addCategoryController,
  addGamesToCategoryController,
  listCategoriesController,
} from "../controllers/category.controller";
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

export default categoriesRouter;
