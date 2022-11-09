import AppDataSource from "../../data-source";
import Users from "../../entities/users.entities";

const listUserService = async (adm: boolean): Promise<Users[]> => {
  const usersRepository = AppDataSource.getRepository(Users);
  let users = await usersRepository.find();

  if (adm === false) {
    users = await users.filter((element) => element.availability === true);
  }
  return users;
};

export default listUserService;
