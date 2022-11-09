import AppDataSource from "../../data-source";
import Categories from "../../entities/categories.entities";
import Games from "../../entities/games.intities";
import AppError from "../../errors/AppError";

const addGameToCategoryService = async (
  id: string,
  idCategory: string
): Promise<string> => {
  if (!idCategory || !id) {
    throw new AppError("All the field are required", 400);
  }
  const gamesRepository = AppDataSource.getRepository(Games);
  const games = await gamesRepository.findOneBy({ id });

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

  const valid = categoryGame.games.find((element) => element.id === id);

  if (valid) {
    throw new AppError("Game already inscribed in this category", 409);
  }

  await gamesRepository.update(id, {
    categories: categoryGame,
  });

  return games.name;
};

export default addGameToCategoryService;
