import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ObjectiveController } from './objective.controller';
import { ObjectiveRepository } from '../domain/repository/objective.repository';
import { DeleteObjectiveUseCase } from '../domain/use-cases/delete-objective.use-cases';
import { CreateObjectiveUseCase } from '../domain/use-cases/create-objective.use-cases';
import { FindObjectiveUseCase } from '../domain/use-cases/find-objective.use-cases';
import { UpdateObjectiveUseCase } from '../domain/use-cases/update-objective.use-case';
import { ConfigModule } from '@nestjs/config';
import { ObjectiveRepositoryImpl } from '../data-access/infraestructure/repository/objective.repository.impl';
import { ObjectiveModule } from './objective.module';
import { KnexModule } from 'nestjs-knex';

describe('ObjectiveController (e2e)', () => {
  let app: INestApplication;
  let objectiveId: string;

  const objectiveData = {
    descricao: 'Objetivo para o mês de Março',
    id_campanha: 'ddd91cd2-f1c3-4540-9c43-4ef1af7a9b96',
    titulo: 'Objetivo Março',
    premio_associado: 100,
    meta: 500.5,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ObjectiveModule,
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
      controllers: [ObjectiveController],
      providers: [
        CreateObjectiveUseCase,
        FindObjectiveUseCase,
        UpdateObjectiveUseCase,
        DeleteObjectiveUseCase,
        {
          provide: ObjectiveRepository,
          useClass: ObjectiveRepositoryImpl,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/POST /objective should create a objective', async () => {
    const response = await request(app.getHttpServer())
      .post('/objective')
      .send(objectiveData)
      .expect(201);

    expect(response.body).toMatchObject({ ...objectiveData });
    expect(typeof response.body.id).toBe('string');

    objectiveId = response.body.id;
  });

  it('/GET /objective should list all objectives', async () => {
    const response = await request(app.getHttpServer())
      .get('/objective')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    const objectiveFirst = response.body[0];
    expect(objectiveFirst).toHaveProperty('id');
    expect(objectiveFirst).toHaveProperty('descricao');
    expect(objectiveFirst).toHaveProperty('id_campanha');
    expect(objectiveFirst).toHaveProperty('titulo');
    expect(objectiveFirst).toHaveProperty('premio_associado');
    expect(objectiveFirst).toHaveProperty('meta');

    const objectiveLast = response.body[response.body.length - 1];
    expect(objectiveLast).toHaveProperty('id');
    expect(objectiveLast).toHaveProperty('descricao');
    expect(objectiveLast).toHaveProperty('id_campanha');
    expect(objectiveLast).toHaveProperty('titulo');
    expect(objectiveLast).toHaveProperty('premio_associado');
    expect(objectiveLast).toHaveProperty('meta');
  });

  it('GET /objective/:id should return a objective', async () => {
    const response = await request(app.getHttpServer())
      .get(`/objective/${objectiveId}`)
      .expect(200);

    expect(response.body).toMatchObject({ ...objectiveData });
    expect(typeof response.body.id).toBe('string');
  });

  it('PUT /objective/:id should update a objective', async () => {
    const updatedObjectiveData = {
      ...objectiveData,
      titulo: 'Objetivo Abril',
    };

    const putResponse = await request(app.getHttpServer())
      .put(`/objective/${objectiveId}`)
      .send(updatedObjectiveData)
      .expect(200);

    expect(putResponse.body).toMatchObject({ ...updatedObjectiveData });
    expect(typeof putResponse.body.id).toBe('string');
  });

  it('DELETE /objective/:id should delete a objective', async () => {
    await request(app.getHttpServer())
      .delete(`/objective/${objectiveId}`)
      .expect(200);
  });
});
