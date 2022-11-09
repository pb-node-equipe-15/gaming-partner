import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import {
  mockedAdmLogin,
  mockedNotAdmLogin,
  mockedNotAdmUser,
  mockedUser,
} from "../mocks";

describe("/users", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error(err);
      });
    await request(app).post("/users").send(mockedUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("DELETE /users/:id -  Deve ser capaz de fazer a exclusão reversível do usuário", async () => {
    const userLogin = await request(app).post("/login").send(mockedAdmLogin);
    const user = await request(app).post("/users").send(mockedNotAdmUser);

    const response = await request(app)
      .delete(`/users/${user.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /users/:id -  Não deve ser capaz de excluir o usuário com isActive = false", async () => {
    const userLogin = await request(app).post("/login").send(mockedAdmLogin);

    const UserTobeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .delete(`/users/${UserTobeDeleted.body[1].id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});
