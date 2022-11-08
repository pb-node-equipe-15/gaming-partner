import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import { mockedAdmLogin, mockedNotAdmUser, mockedUser } from "../mocks";

describe("Add an user", () => {
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

  test("POST /users/conect -> Deve ser capaz de adicionar um usuário a sua lista de amigos", async () => {
    await request(app).post("/users").send(mockedUser);
    const userLogin = await request(app).post("/login").send(mockedAdmLogin);
    const user = await request(app).post("/users").send(mockedNotAdmUser);

    const addUser = await request(app)
      .post("/users/conect")
      .send({ id: `${user.body.id}` })
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(addUser.status).toBe(201);
    expect(addUser.body).toHaveProperty("message");
  });
});
