import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CampaignController } from './campaign.controller';
import { CampaignRepository } from '../domain/repository/campaign.repository';
import { DeleteCampaignUseCase } from '../domain/use-cases/delete-campaign.use-cases';
import { CreateCampaignUseCase } from '../domain/use-cases/create-campaign.use-cases';
import { FindCampaignUseCase } from '../domain/use-cases/find-campaign.use-cases';
import { UpdateCampaignUseCase } from '../domain/use-cases/update-campaign.use-case';
import { MotoboyRepository } from '../../motoboy/domain/repository/motoboy.repository';
import { ConfigModule } from '@nestjs/config';
import { MotoboyRepositoryImpl } from '../../motoboy/data-access/infraestructure/repostitory/motoboy.repository.impl';
import { CampaignRepositoryImpl } from '../data-access/infraestructure/repository/campaign.repository.impl';
import { CampaignModule } from './campaign.module';
import { KnexModule } from 'nestjs-knex';
import { GenerateBearer } from '../../shared/utils/generate-bearer';
import { LoginUseCase } from '../../auth/domain/use-cases/login.use-case';
import { RegisterUseCase } from '../../auth/domain/use-cases/register.use-case';

describe('CampaignController (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let generateBearer: GenerateBearer;

  const campaignData = {
    tipo: 'Teta',
    dias: ['Segunda-feira'],
    horario_inicial: '2023-09-18T09:00:00.000Z',
    horario_final: '2023-09-18T17:00:00.000Z',
    limite_corridas_ignoradas: 3,
    limite_corridas_recusadas: 2,
    tempo_de_tolerancia: '2023-09-18T09:15:00.000Z',
    descricao: 'Descrição Teste',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CampaignModule,
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
              database: process.env.DATABASE,
              password: process.env.PASSWORD,
            },
          },
        }),
      ],
      controllers: [CampaignController],
      providers: [
        CreateCampaignUseCase,
        FindCampaignUseCase,
        UpdateCampaignUseCase,
        DeleteCampaignUseCase,
        {
          provide: CampaignRepository,
          useClass: CampaignRepositoryImpl,
        },
        {
          provide: MotoboyRepository,
          useClass: MotoboyRepositoryImpl,
        },
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

  it('POST /campaign should create a campaign', async () => {
    const response = await request(app.getHttpServer())
      .post('/campaign')
      .send(campaignData)
      .expect(201);

    expect(response.body).toMatchObject({ ...campaignData, status: true });
    expect(typeof response.body.id).toBe('string');
  });

  it('GET /campaign should list all campaigns', async () => {
    const response = await request(app.getHttpServer())
      .get('/campaign')
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    const campaignFirst = response.body[0];
    expect(campaignFirst).toHaveProperty('tipo');
    expect(campaignFirst).toHaveProperty('dias');
    expect(campaignFirst).toHaveProperty('horario_inicial');
    expect(campaignFirst).toHaveProperty('horario_final');
    expect(campaignFirst).toHaveProperty('limite_corridas_ignoradas');
    expect(campaignFirst).toHaveProperty('limite_corridas_recusadas');
    expect(campaignFirst).toHaveProperty('tempo_de_tolerancia');
    expect(campaignFirst).toHaveProperty('descricao');

    const campaignLast = response.body[-1];
    expect(campaignLast).toHaveProperty('tipo');
    expect(campaignLast).toHaveProperty('dias');
    expect(campaignLast).toHaveProperty('horario_inicial');
    expect(campaignLast).toHaveProperty('horario_final');
    expect(campaignLast).toHaveProperty('limite_corridas_ignoradas');
    expect(campaignLast).toHaveProperty('limite_corridas_recusadas');
    expect(campaignLast).toHaveProperty('tempo_de_tolerancia');
    expect(campaignLast).toHaveProperty('descricao');
  });

  it('PUT /campaign/:id should update a campaign', async () => {
    const postResponse = await request(app.getHttpServer())
      .post('/campaign')
      .send(campaignData)
      .expect(201);

    const createdCampaignId = postResponse.body.id;

    const updatedData = { ...campaignData, tipo: 'Campanha Atualizada' };

    const response = await request(app.getHttpServer())
      .put(`/campaign/${createdCampaignId}`)
      .send(updatedData)
      .expect(200);

    expect(response.body).toMatchObject({ ...updatedData, status: true });
    expect(typeof response.body.id).toBe('string');
  });

  it('DELETE /campaign/:id should delete a campaign', async () => {
    const postResponse = await request(app.getHttpServer())
      .post('/campaign')
      .send(campaignData)
      .expect(201);

    const createdCampaignId = postResponse.body.id;

    await request(app.getHttpServer())
      .delete(`/campaign/${createdCampaignId}`)
      .expect(200);
  });

  it('GET /campaign/:id should get a campaign by its ID', async () => {
    const postResponse = await request(app.getHttpServer())
      .post('/campaign')
      .send(campaignData)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(201);

    const createdCampaignId = postResponse.body.id;

    const response = await request(app.getHttpServer())
      .get(`/campaign/${createdCampaignId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(response.body.tipo).toEqual(campaignData.tipo);
    expect(response.body.dias).toEqual(campaignData.dias);
    expect(response.body.horario_inicial).toEqual(campaignData.horario_inicial);
    expect(response.body.horario_final).toEqual(campaignData.horario_final);
    expect(response.body.limite_corridas_ignoradas).toEqual(
      campaignData.limite_corridas_ignoradas,
    );
    expect(response.body.limite_corridas_recusadas).toEqual(
      campaignData.limite_corridas_recusadas,
    );
    expect(response.body.tempo_de_tolerancia).toEqual(
      campaignData.tempo_de_tolerancia,
    );
    expect(response.body.descricao).toEqual(campaignData.descricao);
  });
});