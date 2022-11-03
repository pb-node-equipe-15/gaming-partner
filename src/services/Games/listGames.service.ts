import AppDataSource from "../../data-source";
import Games from "../../entities/games.intities";

const listGamesService = async () => {
  const userRepository = AppDataSource.getRepository(Games);

  const users = await userRepository.find();

  return users;
};

export default listGamesService;
