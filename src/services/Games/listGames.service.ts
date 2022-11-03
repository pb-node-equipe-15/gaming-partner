import AppDataSource from "../../data-source";
import Games from "../../entities/games.intities";

const listGamesService = async (): Promise<Games[]> => {
  const gamesRepository = AppDataSource.getRepository(Games);

  const games = await gamesRepository.find();

  return games;
};

export default listGamesService;
