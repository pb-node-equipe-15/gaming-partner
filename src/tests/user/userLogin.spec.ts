import app from "../../app";
import request from "supertest";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import { mockedAdmLogin, mockedNotAdmLogin, mockedUser } from "../mocks";

describe("Login an user", () => {
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

  test("POST /login -> Deve ser capaz de fazer login do usuário", async () => {
    const userLogin = await request(app).post("/login").send(mockedAdmLogin);

    expect(userLogin.status).toBe(201);
    expect(userLogin.body).toHaveProperty("token");
  });

  test("POST /login -> Não deve ser capaz de fazer login de usuário inexistente", async () => {
    const userLogin = await request(app).post("/login").send(mockedNotAdmLogin);

    expect(userLogin.status).toBe(403);
    expect(userLogin.body).toHaveProperty("message");
  });
});
