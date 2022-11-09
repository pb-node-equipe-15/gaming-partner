import request from 'supertest';
import { DataSource } from 'typeorm';
import app from '../../app';
import AppDataSource from '../../data-source';
import { IUserCreate } from '../../interfaces';
import createUserService from '../../services/users/createUser.service';
import { createdUsers } from '../database';
import { mockedNotAdmUser, mockedUser } from '../mocks';

describe('Create an user', () => {
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

  test('Deve ser capaz de criar um usuário', async () => {
    const userData: IUserCreate = {
      email: 'pk@kenzie.com',
      name: 'Patrick',
      isAdm: true,
      password: '1234',
    };
    const result = await createUserService(userData);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('isAdm');
    expect(result).toHaveProperty('isActive');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updateAt');
    expect(result).toHaveProperty('availability');
    expect(result.password).not.toEqual(userData.password);
  });

  test(' POST /users -> Deve ser capaz de criar um usuário', async () => {
    const user = await request(app).post('/users').send(mockedUser);

    expect(user.status).toBe(201);
    expect(user.body.isActive).toEqual(true);
    expect(user.body).toHaveProperty('id');
    expect(user.body).toHaveProperty('name');
    expect(user.body).toHaveProperty('email');
    expect(user.body).toHaveProperty('isAdm');
    expect(user.body).toHaveProperty('isActive');
    expect(user.body).toHaveProperty('createdAt');
    expect(user.body).toHaveProperty('updateAt');
    expect(user.body).not.toHaveProperty('password');
    createdUsers.push(user.body);
  });

  test('POST /users -> Não deve ser capaz de criar um usuário com Email já existente', async () => {
    const user = await request(app).post('/users').send(mockedUser);

    expect(user.body).toHaveProperty('message');
    expect(user.status).toBe(403);
  });
});
