import AppDataSource from "../../data-source";
import Users from "../../entities/users.entities";
import UsersGames from "../../entities/usersGames.entities";
import AppError from "../../errors/AppError";

const unsubscribeGameService = async (
  id: string,
  idUser: string
): Promise<void> => {
  const usersRepository = AppDataSource.getRepository(Users);
  const userGameRepository = AppDataSource.getRepository(UsersGames);

  const user = await usersRepository.findOneBy({ id: idUser });

  const valid = user?.games.find((element) => element.games.id === id);

  if (!valid) {
    throw new AppError("User inscription was not found in this game", 400);
  }

  await userGameRepository.delete({ id: valid.id });
};

export default unsubscribeGameService;
