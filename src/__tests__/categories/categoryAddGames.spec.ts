import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import {
  mockedAdmLogin,
  mockedCategory,
  mockedGamer,
  mockedNotAdmLogin,
  mockedNotAdmUser,
  mockedUser,
} from "../mocks";

describe("Add an category in game", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error(err);
      });
    await request(app).post("/users").send(mockedUser);
    await request(app).post("/users").send(mockedNotAdmUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /categories/:id -> Deve ser capaz de adicionar uma categoria a um jogo, se for administrador", async () => {
    const userLogin = await request(app).post("/login").send(mockedAdmLogin);
    const game = await request(app)
      .post("/games")
      .send(mockedGamer)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const category = await request(app)
      .post("/categories")
      .send(mockedCategory)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const addCategoryGames = await request(app)
      .post(`/categories/${category.body.id}`)
      .send({ game: `${game.body.id}` })
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(addCategoryGames.status).toBe(201);
    expect(addCategoryGames.body).toHaveProperty("message");
  });

  test("POST  /categories/:id -> Não deve ser capaz de adicionar uma categoria a um jogo, se não for administrado", async () => {
    const userLogin = await request(app).post("/login").send(mockedAdmLogin);
    const userLoginNotAdm = await request(app)
      .post("/login")
      .send(mockedNotAdmLogin);

    const gameList = await request(app)
      .get("/games")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const category = await request(app)
      .post("/categories")
      .send(mockedCategory)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const addCategoryGames = await request(app)
      .post(`/categories/${category.body.id}`)
      .send({ game: `${gameList.body[0].id}` })
      .set("Authorization", `Bearer ${userLoginNotAdm.body.token}`);

    expect(addCategoryGames.status).toBe(403);
    expect(addCategoryGames.body).toHaveProperty("message");
  });

  test("POST  /categories/:id -> Não deve ser capaz de adicionar uma categoria a um jogo, se o jogo já estiver nessa categoria", async () => {
    const userLogin = await request(app).post("/login").send(mockedAdmLogin);
    const gameList = await request(app)
      .get("/games")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const categoryList = await request(app)
      .get("/categories")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const addCategoryGames = await request(app)
      .post(`/categories/${categoryList.body[0].id}`)
      .send({ game: `${gameList.body[0].id}` })
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(addCategoryGames.status).toBe(409);
    expect(addCategoryGames.body).toHaveProperty("message");
  });
});
