import request from 'supertest';
import { DataSource } from 'typeorm';
import app from '../../app';
import AppDataSource from '../../data-source';
import {
  mockedAdmLogin,
  mockedNotAdmLogin,
  mockedNotAdmUser,
  mockedUser,
  mockedUserUpdate,
} from '../mocks';

describe('List all users', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error(err);
      });
    await request(app).post('/users').send(mockedNotAdmUser);
    await request(app).post('/users').send(mockedUser);
    await request(app).post('/users').send(mockedUserUpdate);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('GET /users -> Deve listar todos os usuários', async () => {
    const userLogin = await request(app).post('/login').send(mockedAdmLogin);

    const userList = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${userLogin.body.token}`);

    expect(userList.status).toBe(200);
    expect(userList.body).toHaveLength(3);
  });

  test('GET /users -> Se não for administrador, deve listar somente usuários disponíveis ', async () => {
    const userLoginNotAdm = await request(app)
      .post('/login')
      .send(mockedNotAdmLogin);
    await request(app).post('/login').send(mockedAdmLogin);

    const userList = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${userLoginNotAdm.body.token}`);

    expect(userList.status).toBe(200);
    expect(userList.body).toHaveLength(2);
    expect(userList.body[1].availability).toBe(true);
  });
});
