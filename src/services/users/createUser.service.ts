import { hash } from 'bcryptjs';

import { IUserCreate } from '../../interfaces';
import Users from '../../entities/users.entities';
import AppDataSource from '../../data-source';
import AppError from '../../errors/AppError';

const createUserService = async ({ name, email, isAdm, password,}: IUserCreate): Promise<Users> => {
  const usersRepository = AppDataSource.getRepository(Users);

  if (!password || !email || !name || !isAdm) {
    throw new AppError('All the fields are required', 400);
  }

  const hashedPassword = await hash(password, 10);

  const user = usersRepository.create({
    name,
    email,
    isAdm,
    password: hashedPassword,
  });

  await usersRepository.save(user);

  return user;
};

export default createUserService;
