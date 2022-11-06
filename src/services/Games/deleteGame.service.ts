import AppDataSource from "../../data-source";
import Games from "../../entities/games.intities";
import AppError from "../../errors/AppError";

const deleteGameService = async (id: string): Promise<Games> => {
  const gamesRepository = AppDataSource.getRepository(Games);
  const gameDeleted = await gamesRepository.findOneBy({ id: id });

  if (!gameDeleted) {
    throw new AppError("Game not Found");
  }
  await gamesRepository.remove(gameDeleted);
  return gameDeleted;
};

export default deleteGameService;
