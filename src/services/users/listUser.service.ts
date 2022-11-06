import AppDataSource from '../../data-source';
import Users from '../../entities/users.entities';

const listUserService = async (): Promise<Users[]> => {
  const usersRepository = AppDataSource.getRepository(Users);
  const users = await usersRepository.find();
  return users;
};

export default listUserService;
