import Users from "../entities/users.entities";
import AppDataSource from "../data-source";
import AppError from "../errors/AppError";

const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(Users);

  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.isActive === false) {
    throw new AppError("User inactive", 400);
  }

  await userRepository.update({ id }, { isActive: false });

  return true;
};

export default deleteUserService;