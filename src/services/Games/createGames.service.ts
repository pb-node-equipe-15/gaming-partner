import { IGamerCreate } from "../../interfaces";
import Games from "../../entities/games.intities";
import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";

const createGameService = async ({
  name,
  description,
}: IGamerCreate): Promise<Games> => {
  const gamesRepository = AppDataSource.getRepository(Games);

  if (!name) {
    throw new AppError("Name field is empty", 400);
  }

  const game = gamesRepository.create({
    name,
    description,
  });

  await gamesRepository.save(game);

  return game;
};

export default createGameService;
