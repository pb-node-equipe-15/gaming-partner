import Games from '../../entities/games.intities';
import { IUpdateGame } from '../../interfaces';
import AppDataSource from '../../data-source';
import AppError from '../../errors/AppError';

const updateGameService = async ({ name, description }: IUpdateGame, id: string): Promise<Games> => {
  const gamesRepository = AppDataSource.getRepository(Games);

  const findGame = await gamesRepository.findOneBy({ id });

  if (!findGame) {
    throw new AppError('Game not found', 404);
  }

  await gamesRepository.update(id, {
    name: name ? name : findGame.name,
    description: description ? description : findGame.description,
  });

  const game = await gamesRepository.findOneBy({
    id,
  });

  return game!;
};

export default updateGameService;
