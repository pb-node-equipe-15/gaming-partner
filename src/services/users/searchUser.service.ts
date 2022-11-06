import AppDataSource from "../../data-source";
import Users from "../../entities/users.entities";
import AppError from "../../errors/AppError";

const searchUserService = async (id: string): Promise<Users> => {
  const usersRepository = AppDataSource.getRepository(Users);
  const user = await usersRepository.findOneBy({ id });

  if (!user) {
    throw new AppError("User not found");
  }

  return user;
};

export default searchUserService;
