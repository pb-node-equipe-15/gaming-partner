import { IUserCreate } from "../../interfaces";
import { hash } from "bcryptjs";
import Users from "../../entities/users.entities";
import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";

const createUserService = async ({
  name,
  email,
  isAdm,
  password,
}: IUserCreate): Promise<Users> => {
  const usersRepository = AppDataSource.getRepository(Users);

  if (!password) {
    throw new AppError("Password is missing", 400);
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
