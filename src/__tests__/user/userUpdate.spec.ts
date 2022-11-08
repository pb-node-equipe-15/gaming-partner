import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import {
  mockedAdmLogin,
  mockedNotAdmLogin,
  mockedNotAdmUser,
  mockedUser,
  mockedUserUpdate,
  mockedUserUpdateLogin,
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

  test("PATCH /users/:id -> Não deve ser capaz de atualizar o usuário, se não for o proprietário", async () => {
    const user = await request(app).post("/users").send(mockedUser);
    await request(app).post("/users").send(mockedNotAdmUser);
    const userLogin = await request(app).post("/login").send(mockedNotAdmLogin);

    const result = await request(app)
      .patch(`/users/${user.body.id}`)
      .send({ name: "Henrique Santos" })
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(result.status).toBe(403);
    expect(result.body).toHaveProperty("message");
  });

  test("PATCH /users/:id -> Deve ser capaz de atualizar o usuário", async () => {
    const user = await request(app).post("/users").send(mockedUserUpdate);
    const userLogin = await request(app)
      .post("/login")
      .send(mockedUserUpdateLogin);

    const result = await request(app)
      .patch(`/users/${user.body.id}`)
      .send({ name: "Ketly Lavinia" })
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty("id");
    expect(result.body).toHaveProperty("name");
    expect(result.body).toHaveProperty("email");
    expect(result.body).toHaveProperty("isAdm");
    expect(result.body).toHaveProperty("isActive");
    expect(result.body).toHaveProperty("availability");
    expect(result.body).toHaveProperty("createdAt");
    expect(result.body).toHaveProperty("updateAt");
    expect(result.body).not.toHaveProperty("password");
  });
});
