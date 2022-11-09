import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import {
  mockedAdmLogin,
  mockedCategory,
  mockedNotAdmLogin,
  mockedNotAdmUser,
  mockedUser,
} from "../mocks";

describe("List all category", () => {
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
      .post("/categories")
      .send(mockedCategory)
      .set("Authorization", `Bearer ${userLogin.body.token}`);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("GET /categories -> Deve ser capaz de listar todas as categorias", async () => {
    const userLogin = await request(app).post("/login").send(mockedNotAdmLogin);

    const categoryList = await request(app)
      .get("/categories")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(categoryList.status).toBe(200);
    expect(categoryList.body).toHaveLength(1);
  });
});
