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
  const findUser = await usersRepository.find();
  const emailAlreadyExists = findUser.find((user) => user.email === email);

  if (!password || !email || !name || !isAdm) {
    throw new AppError("All the fields are required", 400);
  }

  if (emailAlreadyExists) {
    throw new AppError("Email already in use", 403);
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
