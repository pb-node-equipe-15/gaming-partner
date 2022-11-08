import AppDataSource from "../../data-source";
import Categories from "../../entities/categories.entities";
import Games from "../../entities/games.intities";
import AppError from "../../errors/AppError";

const addGameToCategoryService = async (
  id: string,
  idCategory: string
): Promise<Categories> => {
  const gamesRepository = AppDataSource.getRepository(Games);
  const games = await gamesRepository.findOneBy({ id });

  if (!idCategory || !id) {
    throw new AppError("All the field are required", 400);
  }

  if (!games) {
    throw new AppError("Game not found", 404);
  }

  const categoriesRespository = AppDataSource.getRepository(Categories);
  const categoryGame = await categoriesRespository.findOneBy({
    id: idCategory,
  });

  if (!categoryGame) {
    throw new AppError("Category not found", 404);
  }

  await gamesRepository.update(id, {
    categories: categoryGame,
  });

  return categoryGame;
};

export default addGameToCategoryService;
