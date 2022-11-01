import { ICategoryCreate, IGamerCreate, IUserCreate } from "../../interfaces";

export const mockedUser: IUserCreate = {
  name: "Patrick",
  email: "pk@mail.com",
  isAdm: true,
  password: "1234",
};

export const mockedGamer: IGamerCreate = {
  name: "The Witcher 3: Wild Hunt",
  description:
    "Enquanto a guerra assola todos os Reinos do Norte, você enfrenta o maior conflito de sua vida: ir em busca da criança da profecia, uma arma senciente capaz de alterar o mundo.",
};

export const mockedCategory: ICategoryCreate = {
  name: "RPG",
};
