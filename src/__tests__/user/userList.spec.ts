import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import {
  mockedAdmLogin,
  mockedNotAdmLogin,
  mockedNotAdmUser,
  mockedUser,
} from "../mocks";

describe("List all users", () => {
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

  test("GET /users -> Deve listar todos os usuários", async () => {
    await request(app).post("/users").send(mockedUser);
    const userLogin = await request(app).post("/login").send(mockedAdmLogin);

    const userList = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(userList.status).toBe(200);
    expect(userList.body).toHaveLength(1);
  });

  test("GET /users -> Não deve ser capaz de listar os usuários, se não for administrador", async () => {
    await request(app).post("/users").send(mockedNotAdmUser);
    const userLogin = await request(app).post("/login").send(mockedNotAdmLogin);

    const userList = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(userList.status).toBe(403);
    expect(userList.body).toHaveProperty("message");
  });
});
