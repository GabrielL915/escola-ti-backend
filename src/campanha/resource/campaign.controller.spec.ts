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
import { AuthModule } from '../../auth/resource/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MotoboyRepositoryImpl } from '../../motoboy/data-access/infraestructure/repostitory/motoboy.repository.impl';
import { CampaignRepositoryImpl } from '../data-access/infraestructure/repository/campaign.repository.impl';
import { CampaignModule } from './campaign.module';
import { KnexModule } from 'nestjs-knex';

describe('CampaignController (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let mockKnex: any;

  const mockCampaignRepository = {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  const mockMotoboyRepository = {
    findByEmail: jest.fn(),
  };

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

  const motoboyData = {
    nome: 'Kleber',
    sobrenome: 'Silva',
    cpf: '000.000.000-00',
    cnpj: '00.000.000/0000-00',
    email: 'emailtest@example.com',
    telefone: '(44) 99999-9999',
    data_de_nascimento: '01/01/2000',
    senha: '12345678',
    mochila: true,
    id_endereco_de_servico: '00000000-0000-0000-0000-000000000000',
  };

  const mockConfigService = {
    get: jest.fn((key) => {
      if (key === 'KEY') {
        return 'defaultSecretKeyForTests';
      }
      return null;
    }),
  };

  async function authenticateAndGetToken() {
    mockMotoboyRepository.findByEmail.mockResolvedValue(motoboyData);

    const response = await request(app.getHttpServer()).post('/login').send({
      email: motoboyData.email,
      senha: motoboyData.senha,
    });
    return response.body.access_token;
  }

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
  });

  beforeEach(async () => {
    jwtToken = await authenticateAndGetToken();
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

  it('POST /campaign should throw error for invalid data', async () => {
    const invalidCampaignData = {
      ...campaignData,
      tipo: 'This is a very long campaign name that should definitely fail validation',
    };

    const response = await request(app.getHttpServer())
      .post('/campaign')
      .send(invalidCampaignData)
      .expect(400);
    
    expect(response.body.message).toContain(
      'O tipo deve ter entre 1 e 30 caracteres.',
    );
  });

  // it('GET /campaign should list all campaigns', async () => {
  //   mockCampaignRepository.findAll.mockResolvedValue([campaignData]);

  //   await request(app.getHttpServer())
  //     .get('/campaign')
  //     .expect(200)
  //     .expect([campaignData]);
  // });

  // it('PUT /campaign/:id should update a campaign', async () => {
  //   const updatedData = { ...campaignData, tipo: 'Campanha Atualizada' };
  //   mockCampaignRepository.update.mockResolvedValue(updatedData);

  //   await request(app.getHttpServer())
  //     .put(`/campaign/someId`)
  //     .send(updatedData)
  //     .expect(200)
  //     .expect(updatedData);
  // });

  // it('DELETE /campaign/:id should delete a campaign', async () => {
  //   mockCampaignRepository.delete.mockResolvedValue(undefined);

  //   await request(app.getHttpServer()).delete(`/campaign/someId`).expect(200);
  // });

  // it('GET /campaign/:id should get a campaign by its ID', async () => {
  //   mockCampaignRepository.findOne.mockResolvedValue(campaignData);
  //   console.log(campaignData.id);

  //   await request(app.getHttpServer())
  //     .get(`/campaign/${campaignData.id}`)
  //     .set('Authorization', `Bearer ${jwtToken}`)
  //     .expect(200)
  //     .expect(campaignData);
  // });

  // it('GET /campaign/:id should throw 404 if campaign not found', async () => {
  //   mockCampaignRepository.findOne.mockResolvedValue(null);

  //   await request(app.getHttpServer())
  //     .get(`/campaign/someInvalidId`)
  //     .set('Authorization', `Bearer ${jwtToken}`)
  //     .expect(404);
  // });
});
