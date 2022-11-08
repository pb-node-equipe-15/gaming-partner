import AppDataSource from "../../data-source";
import Conections from "../../entities/conections.entities";
import Users from "../../entities/users.entities";
import AppError from "../../errors/AppError";

const conectUserService = async (
  id: string,
  idUser: string
): Promise<string> => {
  const userRepository = AppDataSource.getRepository(Users);
  const conectionsRespository = AppDataSource.getRepository(Conections);

  const user = await userRepository.findOneBy({ id });
  const userConect = await userRepository.findOneBy({ id: idUser });

  if (!user || !userConect) {
    throw new AppError("User not found to conect", 400);
  }

  await conectionsRespository.save({
    user: userConect,
  });

  return `${userConect.name}`;
};

export default conectUserService;
