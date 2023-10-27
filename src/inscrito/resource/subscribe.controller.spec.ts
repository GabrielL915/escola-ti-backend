import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { SubscribeController } from './subscribe.controller';
import { CreateSubscribeUseCase } from '../domain/use-cases/create-subscribe.use-cases';
import { FindSubscribeUseCase } from '../domain/use-cases/find-subscribe.use-cases';
import { UpdateSubscribeUseCase } from '../domain/use-cases/update-subscribe.use-cases';
import { DeleteSubscribeUseCase } from '../domain/use-cases/delete-subscribe.use-cases';
import { SubscribeRepository } from '../domain/repository/subscribe.repository';
import { ConfigModule } from '@nestjs/config';
import { SubscribeRepositoryImpl } from '../data-access/infraestructure/repository/subscribe.repository.impl';
import { SubscribeModule } from './subscribe.module';
import { KnexModule } from 'nestjs-knex';

describe('SubscribeController (e2e)', () => {
  let app: INestApplication;
  let subscribeId: string;

  const SubscribeData = {
    id_entregador: '77a47987-092e-45e9-b358-8fa4544e8d70',
    id_campanha: '3a092750-b478-47b2-b237-0f312b8c8e1e',
    data_de_inscricao: '2023-05-09T03:00:00.000Z',
    entregas_ignoradas: 0,
    entregas_recusadas: 0,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        SubscribeModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
        }),
        KnexModule.forRoot({
          config: {
            client: 'postgresql',
            useNullAsDefault: true,
            connection: {
              connectionString: process.env.CONNECTION_STRING,
              ssl: { rejectUnauthorized: false },
              host: process.env.HOST,
              port: 5432,
              user: process.env.USER,
              password: process.env.PASSWORD,
              database: process.env.DATABASE,
            },
          },
        }),
      ],
      controllers: [SubscribeController],
      providers: [
        CreateSubscribeUseCase,
        FindSubscribeUseCase,
        UpdateSubscribeUseCase,
        DeleteSubscribeUseCase,
        {
          provide: SubscribeRepository,
          useClass: SubscribeRepositoryImpl,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/POST /subscribe should create a new subscribe', async () => {
    const response = await request(app.getHttpServer())
      .post('/subscribe')
      .send(SubscribeData)
      .expect(201);

    expect(response.body).toMatchObject({ ...SubscribeData });
    expect(typeof response.body.id).toBe('string');

    subscribeId = response.body.id;
  });

  it('/GET /subscribe should list all subscribes', async () => {
    const response = await request(app.getHttpServer())
      .get('/subscribe')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    const subscribefirst = response.body[0];
    expect(subscribefirst).toHaveProperty('id');
    expect(subscribefirst).toHaveProperty('id_entregador');
    expect(subscribefirst).toHaveProperty('id_campanha');
    expect(subscribefirst).toHaveProperty('data_de_inscricao');
    expect(subscribefirst).toHaveProperty('entregas_ignoradas');
    expect(subscribefirst).toHaveProperty('entregas_recusadas');

    const subscribeLast = response.body[response.body.length - 1];
    expect(subscribeLast).toHaveProperty('id');
    expect(subscribeLast).toHaveProperty('id_entregador');
    expect(subscribeLast).toHaveProperty('id_campanha');
    expect(subscribeLast).toHaveProperty('data_de_inscricao');
    expect(subscribeLast).toHaveProperty('entregas_ignoradas');
    expect(subscribeLast).toHaveProperty('entregas_recusadas');
  });

  it('GET /subscribe/:id should return a subscribe', async () => {
    const response = await request(app.getHttpServer())
      .get(`/subscribe/${subscribeId}`)
      .expect(200);

    expect(response.body).toMatchObject({ ...SubscribeData });
    expect(typeof response.body.id).toBe('string');
  });

  it('PUT /subscribe/:id should update a subscribe', async () => {
    const updatedSubscribeData = {
      ...SubscribeData,
      entregas_ignoradas: 1,
      entregas_recusadas: 1,
    };

    const putResponse = await request(app.getHttpServer())
      .put(`/subscribe/${subscribeId}`)
      .send(updatedSubscribeData)
      .expect(200);

    expect(putResponse.body).toMatchObject({ ...updatedSubscribeData });
    expect(typeof putResponse.body.id).toBe('string');
  });

  it('DELETE /subscribe/:id should delete a subscribe', async () => {
    await request(app.getHttpServer())
      .delete(`/subscribe/${subscribeId}`)
      .expect(200);
  });
});
