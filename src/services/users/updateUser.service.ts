import { hash } from "bcrypt";

import AppDataSource from "../../data-source";
import Users from "../../entities/users.entities";
import { IUserUpdateRequest } from "../../interfaces";
import AppError from "../../errors/AppError";

const updateUserService = async (
  { name, email, password }: IUserUpdateRequest,
  id: string,
  tokenId: string
): Promise<Users | Array<string | number>> => {
  const usersRepository = AppDataSource.getRepository(Users);

  const findUser = await usersRepository.findOneBy({ id });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  if (id !== tokenId) {
    throw new AppError("Unauthorized access", 403);
  }

  await usersRepository.update(id, {
    name: name ? name : findUser.name,
    email: email ? email : findUser.email,
    password: password ? await hash(password, 10) : findUser.password,
  });

  const user = await usersRepository.findOneBy({ id });

  return user!;
};

export default updateUserService;
