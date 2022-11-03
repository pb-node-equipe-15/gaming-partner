import { SimpleConsoleLogger } from "typeorm";
import AppDataSource from "../../data-source";
import Games from "../../entities/games.intities";
import AppError from "../../errors/AppError";

const deleteGameService = async (id: string) => {
  const gamesRepository = AppDataSource.getRepository(Games);
  const gameDeleted = await gamesRepository.findOneBy({ id: id });
  
  if (!gameDeleted) {
    throw new AppError("Game not Found");
  } else {
    await gamesRepository.remove(gameDeleted);
    return { message: `${gameDeleted.name} has been deleted` };
  }
};

export default deleteGameService;
