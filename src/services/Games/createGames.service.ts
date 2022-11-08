import { IGamerCreate } from "../../interfaces";
import Games from "../../entities/games.intities";
import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";
import Categories from "../../entities/categories.entities";

const createGameService = async ({
  name,
  description,
}: IGamerCreate): Promise<Games> => {
  const gamesRepository = AppDataSource.getRepository(Games);
  const games = await gamesRepository.find();
  const gameAlreadyExists = games.find((game) => game.name === name);

  if (!name) {
    throw new AppError("Name field is empty");
  }

  if (gameAlreadyExists) {
    throw new AppError("Game already exists", 403);
  }

  const game = gamesRepository.create({
    name,
    description,
  });

  await gamesRepository.save(game);

  return game;
};

export default createGameService;
