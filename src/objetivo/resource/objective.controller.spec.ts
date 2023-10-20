import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ObjectiveController } from './objective.controller';
import { ObjectiveRepository } from '../domain/repository/objective.repository';
import { DeleteObjectiveUseCase } from '../domain/use-cases/delete-objective.use-cases';
import { CreateObjectiveUseCase } from '../domain/use-cases/create-objective.use-cases';
import { FindObjectiveUseCase } from '../domain/use-cases/find-objective.use-cases';
import { UpdateObjectiveUseCase } from '../domain/use-cases/update-objective.use-case';
import { MotoboyRepository } from '../../motoboy/domain/repository/motoboy.repository';
import { ConfigModule } from '@nestjs/config';
import { MotoboyRepositoryImpl } from '../../motoboy/data-access/infraestructure/repostitory/motoboy.repository.impl';
import { ObjectiveRepositoryImpl } from '../data-access/infraestructure/repository/objective.repository.impl';
import { ObjectiveModule } from './objective.module';
import { KnexModule } from 'nestjs-knex';
import { GenerateBearer } from '../../shared/utils/generate-bearer';
import { LoginUseCase } from '../../auth/domain/use-cases/login.use-case';
import { RegisterUseCase } from '../../auth/domain/use-cases/register.use-case';
import { JwtModule } from '@nestjs/jwt';

describe('ObjectiveController (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let generateBearer: GenerateBearer;

  const objectiveData = {
    id_campanha: '1',
    titulo: 'Objetivo Março',
    descricao: 'Objetivo para o mês de Março',
    premio_associado: 100,
    meta: 500.5,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ObjectiveModule,
        JwtModule,
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
        {
          provide: ObjectiveRepository,
          useClass: ObjectiveRepositoryImpl,
        },
        {
          provide: MotoboyRepository,
          useClass: MotoboyRepositoryImpl,
        },
        CreateObjectiveUseCase,
        DeleteObjectiveUseCase,
        FindObjectiveUseCase,
        UpdateObjectiveUseCase,
        LoginUseCase,
        RegisterUseCase,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const motoboyRepo = moduleFixture.get<RegisterUseCase>(RegisterUseCase);
    const loginUseCase = moduleFixture.get<LoginUseCase>(LoginUseCase);
    generateBearer = new GenerateBearer(motoboyRepo, loginUseCase);
    jwtToken = await generateBearer.getJwtToken();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/POST /obejctive should create a objective', async () => {
    const response = await request(app.getHttpServer())
      .post('/objective')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(objectiveData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(Number),
      ...objectiveData,
    });
  });

  it('/GET /objective should list all objectives', async () => {
    const response = await request(app.getHttpServer())
      .get('/objective')
      .set('Authorization', `Bearer ${jwtToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('PUT /objective/:id should update a objective', async () => {
    const response = await request(app.getHttpServer())
      .put('/objective/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(objectiveData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(Number),
      ...objectiveData,
    });
  });

  it('DELETE /objective/:id should delete a objective', async () => {
    const response = await request(app.getHttpServer())
      .delete('/objective/1')
      .set('Authorization', `Bearer ${jwtToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Objetivo deletado com sucesso',
    });
  });

  it('GET /objective/:id should return a objective', async () => {
    const postResnpone = await request(app.getHttpServer())
    .post('/objective')
    .send(objectiveData)
    .set('Authorization', `Bearer ${jwtToken}`)
    .expect(201);

    const createdObjectiveId = postResnpone.body.id;

    const response = await request(app.getHttpServer())
      .get(`/objective/${createdObjectiveId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(response.body.id_campanha).toEqual(objectiveData.id_campanha);
    expect(response.body.titulo).toEqual(objectiveData.titulo);
    expect(response.body.descricao).toEqual(objectiveData.descricao);
    expect(response.body.premio_associado).toEqual(objectiveData.premio_associado);
    expect(response.body.meta).toEqual(objectiveData.meta);
  });
});
