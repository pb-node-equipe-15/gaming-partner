import { DataSource } from 'typeorm';
import AppDataSource from '../../data-source';
import request from 'supertest';
import app from '../../app';
import {
  mockedAdmLogin,
  mockedGamer,
  mockedNotAdmLogin,
  mockedNotAdmUser,
  mockedUser,
} from '../mocks';

describe('Delete an game', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error(err);
      });
    await request(app).post('/users').send(mockedUser);
    await request(app).post('/users').send(mockedNotAdmUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('DELETE /games/:id -> Deve ser capaz de deletar um jogo, se for administrador', async () => {
    const userLogin = await request(app).post('/login').send(mockedAdmLogin);

    const game = await request(app)
      .post('/games')
      .send(mockedGamer)
      .set('Authorization', `Bearer ${userLogin.body.token}`);

    const gamerDelete = await request(app)
      .delete(`/games/${game.body.id}`)
      .set('Authorization', `Bearer ${userLogin.body.token}`);

    expect(gamerDelete.status).toBe(200);
    expect(gamerDelete.body).toHaveProperty('message');
  });

  test('DELETE /games/:id -> Não deve ser capaz de deletar um jogo, se não for administrador', async () => {
    const userLogin = await request(app).post('/login').send(mockedNotAdmLogin);
    const userLoginAdm = await request(app).post('/login').send(mockedAdmLogin);
    const game = await request(app)
      .post('/games')
      .send(mockedGamer)
      .set('Authorization', `Bearer ${userLoginAdm.body.token}`);

    const gamerDelete = await request(app)
      .delete(`/games/${game.body.id}`)
      .set('Authorization', `Bearer ${userLogin.body.token}`);

    expect(gamerDelete.status).toBe(403);
    expect(gamerDelete.body).toHaveProperty('message');
  });
});
