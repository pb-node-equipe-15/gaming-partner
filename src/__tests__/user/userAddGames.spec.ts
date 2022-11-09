import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import { mockedAdmLogin, mockedGamer, mockedUser } from "../mocks";

describe("Add an game", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error(err);
      });
    await request(app).post("/users").send(mockedUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /users/add -> Deve ser capaz de adicionar um jogo, a sua lista de jogos ", async () => {
    const userLogin = await request(app).post("/login").send(mockedAdmLogin);

    const game = await request(app)
      .post("/games")
      .send(mockedGamer)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const addGamers = await request(app)
      .post("/users/add")
      .send({ gamesId: `${game.body.id}` })
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(addGamers.status).toBe(201);
    expect(addGamers.body).toHaveProperty("message");
  });

  test("POST /users/add -> Não deve ser capaz de adicionar um jogo, se já existe na sua lista de jogos ", async () => {
    const userLogin = await request(app).post("/login").send(mockedAdmLogin);

    const gameList = await request(app)
      .get("/games")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const addGamers = await request(app)
      .post("/users/add")
      .send({ gamesId: `${gameList.body[0].id}` })
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(addGamers.status).toBe(409);
    expect(addGamers.body).toHaveProperty("message");
  });
});
