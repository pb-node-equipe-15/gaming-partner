import request from 'supertest';
import { DataSource } from 'typeorm';
import app from '../../app';
import AppDataSource from '../../data-source';
import { mockedAdmLogin, mockedGamer, mockedUser } from '../mocks';

describe('Create an game', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error(err);
      });
    await request(app).post('/users').send(mockedUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('POST /games -> Dever ser capaz de criar um jogo se for administrador', async () => {
    const userLogin = await request(app).post('/login').send(mockedAdmLogin);
    const gamers = await request(app)
      .post('/games')
      .send(mockedGamer)
      .set(`Authorization`, `Bearer ${userLogin.body.token}`);

    expect(gamers.status).toBe(201);
    expect(gamers.body).toHaveProperty('id');
    expect(gamers.body).toHaveProperty('name');
    expect(gamers.body).toHaveProperty('description');
    expect(gamers.body).toHaveProperty('createdAt');
    expect(gamers.body).toHaveProperty('updatedAt');
  });

  test('POST /games -> Não dever ser capaz de criar um jogo já existente', async () => {
    const userLogin = await request(app).post('/login').send(mockedAdmLogin);
    const gamers = await request(app)
      .post('/games')
      .send(mockedGamer)
      .set(`Authorization`, `Bearer ${userLogin.body.token}`);

    expect(gamers.status).toBe(403);
    expect(gamers.body).toHaveProperty('message');
  });
});
