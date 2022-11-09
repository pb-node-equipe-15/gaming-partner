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

  const user = await userRepository.findOne({
    where: {
      id,
    },
    relations: {
      conections: {
        userConections: true,
      },
    },
  });
  const userConect = await userRepository.findOneBy({ id: idUser });

  if (!user || !userConect) {
    throw new AppError("User not found to conect", 400);
  }

  if (id === idUser) {
    throw new AppError("You cannot add yourself in your friendlist", 400);
  }

  const valid = user?.conections.filter(
    (element) => element.userConections.id === idUser
  );

  if (valid[0]) {
    throw new AppError("Friend already found in your list", 400);
  }

  await conectionsRespository.save({
    user,
    userConections: userConect,
  });

  return `${userConect.name}`;
};

export default conectUserService;
