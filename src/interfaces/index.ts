export interface IUserCreate {
  name: string;
  email: string;
  isAdm: boolean;
  password: string;
}

export interface IUserUpdateRequest {
  name: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IGamerCreate {
  name: string;
  description: string;
}

export interface IUpdateGame {
  name?: string;
  description?: string;
}

export interface ICategoryCreate {
  name: string;
}
