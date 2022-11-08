import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import { mockedNotAdmLogin, mockedNotAdmUser } from "../mocks";

describe("Data an user", () => {
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

  test("GET /users/:id -> Deve ser capaz de obter informações do próprio usuário", async () => {
    const user = await request(app).post("/users").send(mockedNotAdmUser);
    const userLogin = await request(app).post("/login").send(mockedNotAdmLogin);
    const userList = await request(app)
      .get(`/users/${user.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(userList.status).toBe(200);
    expect(userList.body).toHaveProperty("id");
    expect(userList.body).toHaveProperty("name");
    expect(userList.body).toHaveProperty("email");
    expect(userList.body).toHaveProperty("isAdm");
    expect(userList.body).toHaveProperty("isActive");
    expect(userList.body).toHaveProperty("availability");
    expect(userList.body).toHaveProperty("createdAt");
    expect(userList.body).toHaveProperty("updateAt");
  });

  test("GET /users/:id -> Deve ser capaz de obter informações do próprio usuário", async () => {
    await request(app).post("/users").send(mockedNotAdmUser);
    const userLogin = await request(app).post("/login").send(mockedNotAdmLogin);
    const userList = await request(app)
      .get(`/users/d8a9f299-91df-4644-a926-24470ef2f210`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(userList.status).toBe(400);
    expect(userList.body).toHaveProperty("message");
  });
});
