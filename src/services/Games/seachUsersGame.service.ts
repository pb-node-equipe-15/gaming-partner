import AppDataSource from '../../data-source';
import Games from '../../entities/games.intities';
import UsersGames from '../../entities/usersGames.entities';
import AppError from '../../errors/AppError';

const seachUsersGameService = async (idGame: string): Promise<UsersGames[]> => {
  const usersGameRepository = AppDataSource.getRepository(UsersGames);
  const gamesRepository = AppDataSource.getRepository(Games);

  const game = await gamesRepository.findOneBy({
    id: idGame,
  });

  if (!game) {
    throw new AppError('Game not found', 404);
  }

  const usersGame = await usersGameRepository.find({
    where: {
      games: {
        id: game.id,
      },
    },
    relations: {
      users: true,
    },
  });

  if (!usersGame) {
    throw new AppError('there are no registered registered in this game', 404);
  }

  return usersGame;
};

export default seachUsersGameService;
