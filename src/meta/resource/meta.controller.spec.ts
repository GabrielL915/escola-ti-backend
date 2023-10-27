import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { MetaController } from './meta.controller';
import { CreateMetaUseCase } from '../domain/use-cases/create-meta.use-cases';
import { FindMetaUseCase } from '../domain/use-cases/find-meta.use-cases';
import { UpdateMetaUseCase } from '../domain/use-cases/update-meta.use-case';
import { DeleteMetaUseCase } from '../domain/use-cases/delete-meta.use-cases';
import { MetaRepository } from '../domain/repository/meta.repository';
import { ConfigModule } from '@nestjs/config';
import { MetaRepositoryImpl } from '../data-access/infraestructure/repository/meta.repository.impl';
import { MetaModule } from './meta.module';
import { KnexModule } from 'nestjs-knex';

describe('MetaController (e2e)', () => {
  let app: INestApplication;
  let metaId: string;

  const MetaData = {
    id_inscrito: 'ae98efbc-20e9-4399-8c9f-822a60819548',
    id_campanha: 'ae98efbc-20e9-4399-8c9f-822a60819548',
    id_objetivo: 'd5ffe8d8-af4e-482d-9e11-9072c00f1c7f',
    valor_atingido: 50,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MetaModule,
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
      controllers: [MetaController],
      providers: [
        CreateMetaUseCase,
        FindMetaUseCase,
        UpdateMetaUseCase,
        DeleteMetaUseCase,
        {
          provide: MetaRepository,
          useClass: MetaRepositoryImpl,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/POST /meta should create a new meta', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/meta')
      .send(MetaData)
      .expect(201);

    expect(body).toMatchObject({ ...MetaData });
    expect(typeof body.id).toBe('string');

    metaId = body.id;
  });

  it('/GET /meta should list all metas', async () => {
    const response = await request(app.getHttpServer())
      .get('/meta')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    const metaFirst = response.body[0];
    expect(metaFirst).toHaveProperty('id');
    expect(metaFirst).toHaveProperty('id_inscrito');
    expect(metaFirst).toHaveProperty('id_campanha');
    expect(metaFirst).toHaveProperty('id_objetivo');
    expect(metaFirst).toHaveProperty('valor_atingido');

    const metaLast = response.body[response.body.length - 1];
    expect(metaLast).toHaveProperty('id');
    expect(metaLast).toHaveProperty('id_inscrito');
    expect(metaLast).toHaveProperty('id_campanha');
    expect(metaLast).toHaveProperty('id_objetivo');
    expect(metaLast).toHaveProperty('valor_atingido');
  });

  it('GET /meta/:id should return a meta', async () => {
    const response = await request(app.getHttpServer())
      .get(`/meta/${metaId}`)
      .expect(200);

    expect(response.body).toMatchObject({ ...MetaData });
    expect(response.body).toHaveProperty('string');
  });

  it('PUT /meta/:id should update a meta', async () => {
    const updatedMetaData = {
      ...MetaData,
      valor_atingido: 80,
    };

    const putResponse = await request(app.getHttpServer())
      .put(`/meta/${metaId}`)
      .send(updatedMetaData)
      .expect(200);

    expect(putResponse.body).toMatchObject({ ...updatedMetaData });
    expect(typeof putResponse.body.id).toBe('string');
  });

  it('DELETE /meta/:id should delete a meta', async () => {
    await request(app.getHttpServer())
      .delete(`/meta/${metaId}`)
      .expect(200);
  });
});
