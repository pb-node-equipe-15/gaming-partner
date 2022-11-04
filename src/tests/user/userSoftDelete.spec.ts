import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import { mockedAdmLogin, mockedUser } from "../mocks";

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

  test("DELETE /users/:id -  Must be able to soft delete user", async () => {
    const userLogin = await request(app).post("/login").send(mockedAdmLogin);

    const UserTobeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .delete(`/users/${UserTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const findUser = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toBe(204);
    expect(findUser.body[0].isActive).toBe(false);
  });

  test("DELETE /users/:id -  shouldn't be able to delete user with isActive = false", async () => {
    const userLogin = await request(app).post("/login").send(mockedAdmLogin);

    const UserTobeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .delete(`/users/${UserTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
