import request from 'supertest';
import { DataSource } from 'typeorm';
import app from '../../app';
import AppDataSource from '../../data-source';
import {
  mockedAdmLogin,
  mockedGamer,
  mockedNotAdmLogin,
  mockedNotAdmUser,
  mockedUser,
} from '../mocks';

describe('Update games', () => {
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

  test('PATCH /games/:id -> Não deve ser capaz de atualizar um jogo, se não for administrador', async () => {
    const userLogin = await request(app).post('/login').send(mockedNotAdmLogin);
    const userLoginAdm = await request(app).post('/login').send(mockedAdmLogin);
    const game = await request(app)
      .post('/games')
      .send(mockedGamer)
      .set('Authorization', `Bearer ${userLoginAdm.body.token}`);

    const gameUpdate = await request(app)
      .patch(`/games/${game.body.id}`)
      .send({ description: 'desc1' })
      .set('Authorization', `Bearer ${userLogin.body.token}`);

    expect(gameUpdate.status).toBe(403);
    expect(gameUpdate.body).toHaveProperty('message');
  });

  test('PATCH /games/:id -> Deve ser capaz de atualizar um jogo, se for administrador', async () => {
    const userLoginAdm = await request(app).post('/login').send(mockedAdmLogin);
    const gameList = await request(app)
      .get('/games')
      .set('Authorization', `Bearer ${userLoginAdm.body.token}`);

    const gameUpdate = await request(app)
      .patch(`/games/${gameList.body[0].id}`)
      .send({ description: 'desc1' })
      .set('Authorization', `Bearer ${userLoginAdm.body.token}`);

    expect(gameUpdate.status).toBe(201);
    expect(gameUpdate.body).toHaveProperty('id');
    expect(gameUpdate.body).toHaveProperty('name');
    expect(gameUpdate.body).toHaveProperty('description');
    expect(gameUpdate.body).toHaveProperty('createdAt');
    expect(gameUpdate.body).toHaveProperty('updatedAt');
  });
});
