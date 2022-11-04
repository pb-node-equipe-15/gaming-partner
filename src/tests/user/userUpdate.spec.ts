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

describe("Update users", () => {
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

  test("UPDATE /users/:id -> Não deve ser capaz de atualizar o usuário, se não for administrador", async () => {
    const user = await request(app).post("/users").send(mockedNotAdmUser);
    const userLogin = await request(app).post("/login").send(mockedNotAdmLogin);

    const result = await request(app)
      .patch(`/users/${user.body.id}`)
      .send({ name: "Henrique Santos" })
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(result.status).toBe(403);
    expect(result.body).toHaveProperty("message");
  });

  test("UPDATE /users/:id -> Deve ser capaz de atualizar o usuário", async () => {
    await request(app).post("/users").send(mockedUser);
    const userNotAdm = await request(app).post("/users").send(mockedNotAdmUser);
    const userLogin = await request(app).post("/login").send(mockedAdmLogin);

    const result = await request(app)
      .patch(`/users/${userNotAdm.body.id}`)
      .send({ name: "Henrique Santos" })
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty("message");
  });
});
