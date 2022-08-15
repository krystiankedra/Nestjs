import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app/app.module';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const userToCreate = { email: 'test1@test.com', password: 'test123' }
    request(app.getHttpServer())
      .post('/auth/signup')
      .send(userToCreate)
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(userToCreate.email);
      });
  });

  it('signup as a new user then call for findAllUsers', async () => {
    const userToCreate = { email: 'test2@test.com', password: 'test123' };
    const singupRequest = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(userToCreate)
      .expect(201);

    const cookie = singupRequest.get('Set-Cookie');

    await request(app.getHttpServer())
      .get('/auth')
      .set('Cookie', cookie)
      .expect(200)
  });
});
