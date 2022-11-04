import AppDataSource from '../../data-source';
import Games from '../../entities/games.intities';
import Users from '../../entities/users.entities';
import AppError from '../../errors/AppError';

const unsubscribeGameService = async ( id: string, idUser: string): Promise<void> => {
  const gamesRepository = AppDataSource.getRepository(Games);
  const game = await gamesRepository.findOneBy({ id });

  const usersRepository = AppDataSource.getRepository(Users);
  const user = await usersRepository.findOneBy({ id: idUser });

  if (!game) {
    throw new AppError('game not found', 400);
  }

  const valid = game.usersGames.find((element) => element.users === user);

  if (!valid) {
    throw new AppError('User inscription was not found in this game', 400);
  }

  game.usersGames.filter((element) => element.users !== user);

  await gamesRepository.save(game);
};

export default unsubscribeGameService;
