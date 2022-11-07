import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import {
  mockedAdmLogin,
  mockedGamer,
  mockedNotAdmLogin,
  mockedNotAdmUser,
  mockedUser,
} from "../mocks";

describe("List all games", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error(err);
      });

    await request(app).post("/users").send(mockedNotAdmUser);
    await request(app).post("/users").send(mockedUser);
    const userLogin = await request(app).post("/login").send(mockedAdmLogin);
    await request(app)
      .post("/games")
      .send(mockedGamer)
      .set("Authorization", `Bearer ${userLogin.body.token}`);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("GET /games -> Deve listar todos os games", async () => {
    const userLogin = await request(app).post("/login").send(mockedNotAdmLogin);

    const gamesList = await request(app)
      .get("/games")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(gamesList.status).toBe(200);
    expect(gamesList.body).toHaveLength(1);
  });
});
