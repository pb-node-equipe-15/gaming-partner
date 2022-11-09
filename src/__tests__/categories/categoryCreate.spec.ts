import request from 'supertest';
import { DataSource } from 'typeorm';
import app from '../../app';
import AppDataSource from '../../data-source';
import {
  mockedAdmLogin,
  mockedCategory,
  mockedNotAdmLogin,
  mockedNotAdmUser,
  mockedUser,
} from '../mocks';

describe('Create an category', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error(err);
      });
    await request(app).post('/users').send(mockedUser);
    await request(app).post('/users').send(mockedNotAdmUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('POST /categories -> Deve ser capaz de criar uma categoria se for administrador', async () => {
    const userLogin = await request(app).post('/login').send(mockedAdmLogin);
    const category = await request(app)
      .post('/categories')
      .send(mockedCategory)
      .set(`Authorization`, `Bearer ${userLogin.body.token}`);

    expect(category.status).toBe(201);
    expect(category.body).toHaveProperty('name');
    expect(category.body).toHaveProperty('id');
  });

  test('POST /categories -> Não deve ser capaz de criar uma categoria se não for administrador', async () => {
    const userLogin = await request(app).post('/login').send(mockedNotAdmLogin);
    const category = await request(app)
      .post('/categories')
      .send(mockedCategory)
      .set(`Authorization`, `Bearer ${userLogin.body.token}`);

    expect(category.status).toBe(403);
    expect(category.body).toHaveProperty('message');
  });

  test('POST /categories -> Não deve ser capaz de criar uma categoria já existente', async () => {
    const userLogin = await request(app).post('/login').send(mockedAdmLogin);
    const category = await request(app)
      .post('/categories')
      .send(mockedCategory)
      .set(`Authorization`, `Bearer ${userLogin.body.token}`);

    expect(category.status).toBe(409);
    expect(category.body).toHaveProperty('message');
  });
});
