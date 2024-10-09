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
      .expect('Hello! Visit http://localhost:3000/api for more information');
  });

  it('/users (GET) Returns an array of users with an OK status code', async () => {
    const req = await request(app.getHttpServer()).get('/users');

    console.log('req: ', req);
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });

  it('/users/:id (GET) Returns a single user with an OK status code', async () => {
    const req = await request(app.getHttpServer()).get(
      '/users/c1982490-e6a6-464f-8cb8-4c1d42ed6031',
    );
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
  });

  it('/users/:id (GET) Returns an error with a NOT FOUND status code when user does not exist', async () => {
    const req = await request(app.getHttpServer()).get(
      '/users/701ded1c-951c-451b-8f6f-f2f05079c7a5',
    );
    expect(req.status).toBe(404);
    expect(req.body.message).toBe('User ID not found');
  });

  it('/users/:id (GET) Returns an error with a BAD REQUEST status code when user id is not a UUID', async () => {
    const req = await request(app.getHttpServer()).get('/users/not-a-UUID');
    expect(req.status).toBe(400);
    expect(req.body).toBeInstanceOf(Object);
    expect(req.body.message).toBe('Validation failed (uuid is expected)');
  });

  it('/auth/signup (POST) Returns an created user id with a CREATED status code', async () => {
    const req = await request(app.getHttpServer()).post('/auth/signup').send({
      email: 'mehTest@gmail.com',
      password: 'Aasd123@',
      confirmPassword: 'Aasd123@',
      name: 'Mariano Test',
      address: 'calle falsa 123',
      phone: 1151339874,
      country: 'Argentina',
      city: 'Buenos Aires',
    });
    expect(req.status).toBe(201);
    expect(req.body).toBeInstanceOf(Object);
  });

  it('/users (PUT) Returns an updated user id with an OK status code', async () => {
    const req = await request(app.getHttpServer())
      .put('/users/c1982490-e6a6-464f-8cb8-4c1d42ed6031')
      .send({
        email: 'marianohilario@test.com',
      });
    expect(req.status).toBe(200);
    expect((await req.request).text).toBe(
      'User with ID: "c1982490-e6a6-464f-8cb8-4c1d42ed6031" has been updated successfully.',
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
      '/products/de7cf066-1adc-4493-a103-89bbbce3b5e1',
    );
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
  });
});
