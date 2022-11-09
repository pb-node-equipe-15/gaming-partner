import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import { mockedAdmLogin, mockedGamer, mockedUser } from "../mocks";

describe("Remove a game from the list", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error(err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("PATCH /games/remove/:id -> Deve ser capaz de remover um jogo da própria lista", async () => {
    await request(app).post("/users").send(mockedUser);
    const userLogin = await request(app).post("/login").send(mockedAdmLogin);
    const game = await request(app)
      .post("/games")
      .send(mockedGamer)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    await request(app)
      .post("/users/add")
      .send({ gamesId: `${game.body.id}` })
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const removeGame = await request(app)
      .patch(`/games/remove/${game.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(removeGame.status).toBe(201);
    expect(removeGame.body).toHaveProperty("message");
  });

  test("PATCH /games/remove/:id ->  Não deve ser capaz de remover um jogo que não existe na sua lista", async () => {
    await request(app).post("/users").send(mockedUser);
    const userLogin = await request(app).post("/login").send(mockedAdmLogin);
    const game = await request(app)
      .post("/games")
      .send(mockedGamer)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const removeGame = await request(app)
      .patch(`/games/remove/${game.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(removeGame.status).toBe(400);
    expect(removeGame.body).toHaveProperty("message");
  });
});
