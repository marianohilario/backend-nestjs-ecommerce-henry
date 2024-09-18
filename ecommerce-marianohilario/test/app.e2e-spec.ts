import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthGuard } from '../src/auth/guards/auth.guard';
import { RolesGuard } from '../src/auth/guards/roles.guard';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      // Mock del AuthGuard y RolesGuard
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/users (GET) Returns an array of users with an OK status code', async () => {
    const req = await request(app.getHttpServer()).get('/users');

    console.log('req: ', req);
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });

  it('/users/:id (GET) Returns a single user with an OK status code', async () => {
    const req = await request(app.getHttpServer()).get(
      '/users/701ded1c-951c-451b-8f6f-f2f05079c7a4',
    );
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
  });

  it('/users (PUT) Returns an updated user id with an OK status code', async () => {
    const req = await request(app.getHttpServer())
      .put('/users/701ded1c-951c-451b-8f6f-f2f05079c7a4')
      .send({
        email: 'marianohilario@test.com',
      });
    expect(req.status).toBe(200);
    expect((await req.request).text).toBe(
      '701ded1c-951c-451b-8f6f-f2f05079c7a4',
    );
  });

  it('/products (GET) Returns an array of products with an OK status code', async () => {
    const req = await request(app.getHttpServer()).get('/products');
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
    expect(req.body.length).toBeLessThanOrEqual(5);
  });

  it('/products?page=1&limit=10 (GET) Returns an array of 10 products or less with an OK status code', async () => {
    const req = await request(app.getHttpServer()).get(
      '/products?page=1&limit=10',
    );
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
    expect(req.body.length).toBe(10);
  });

  it('/products/:id (GET) Returns a single product with an OK status code', async () => {
    const req = await request(app.getHttpServer()).get(
      '/products/b4c975f7-b12b-4594-b011-c5b977674083',
    );
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
  });
});
