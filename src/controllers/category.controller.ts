import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import addCategoryService from "../services/Games/addCategory.service";
import addGameToCategoryService from "../services/Games/addGamesToCategory.service";
import listCategoriesService from "../services/Games/listCategories.service";

const addCategoryController = async (req: Request, res: Response) => {
  const name: string = req.body.name;
  const category = await addCategoryService(name);
  return res.status(201).json(category);
};

const addGamesToCategoryController = async (req: Request, res: Response) => {
  const id: string = req.body.game;
  const idCategory: string = req.params.id;
  const result = await addGameToCategoryService(id, idCategory);
  return res.status(201).json(result);
};

const listCategoriesController = async (req: Request, res: Response) => {
  const categories = await listCategoriesService();
  return res.status(200).json(instanceToPlain(categories));
};

export {
  addCategoryController,
  addGamesToCategoryController,
  listCategoriesController,
};
