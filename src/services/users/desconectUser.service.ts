import AppDataSource from '../../data-source';
import Conections from '../../entities/conections.entities';
import AppError from '../../errors/AppError';

const desconectUserService = async (id: string): Promise<void> => {
  const userConectionsRepository = AppDataSource.getRepository(Conections);
  const userConection = await userConectionsRepository.findOneBy({
    id,
  });

  if (!userConection) {
    throw new AppError('User not found as a friend', 400);
  }

  await userConectionsRepository.delete({ id });
};

export default desconectUserService;
