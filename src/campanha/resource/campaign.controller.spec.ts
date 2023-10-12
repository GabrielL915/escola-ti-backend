import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CampaignController } from './campaign.controller';
import { CampaignRepository } from '../domain/repository/campaign.repository';

describe('CampaignController (e2e)', () => {
  let app: INestApplication;
  const mockCampaignRepository = {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  const campaignData = {
    tipo: 'Campanha Pizzas Abril',
    dias: ['Terça-feira', 'Quarta-feira', 'Quinta-feira'],
    horario_inicial: '2023-09-18T09:00:00Z',
    horario_final: '2023-09-18T17:00:00Z',
    limite_corridas_ignoradas: 5,
    limite_corridas_recusadas: 3,
    tempo_de_tolerancia: '2023-09-18T09:15:00Z',
    descricao:
      'Participe da campanha de Pizzas de Abril e obtenha bônus por entrega!',
    ativa: true,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CampaignController],
      providers: [
        {
          provide: CampaignRepository,
          useValue: mockCampaignRepository,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('POST /campaign should create a campaign', async () => {
    mockCampaignRepository.create.mockResolvedValue(campaignData);

    await request(app.getHttpServer())
      .post('/campaign')
      .send(campaignData)
      .expect(201)
      .expect(campaignData);
  });

  it('POST /campaign should throw error for invalid data', async () => {
    const invalidCampaignData = { ...campaignData, tipo: null };
    await request(app.getHttpServer())
      .post('/campaign')
      .send(invalidCampaignData)
      .expect(400);
  });

  it('GET /campaign should list all campaigns', async () => {
    mockCampaignRepository.findAll.mockResolvedValue([campaignData]);

    await request(app.getHttpServer())
      .get('/campaign')
      .expect(200)
      .expect([campaignData]);
  });

  it('PUT /campaign/:id should update a campaign', async () => {
    const updatedData = { ...campaignData, tipo: 'Campanha Atualizada' };
    mockCampaignRepository.update.mockResolvedValue(updatedData);

    await request(app.getHttpServer())
      .put(`/campaign/someId`)
      .send(updatedData)
      .expect(200)
      .expect(updatedData);
  });

  it('DELETE /campaign/:id should delete a campaign', async () => {
    mockCampaignRepository.delete.mockResolvedValue(undefined);

    await request(app.getHttpServer()).delete(`/campaign/someId`).expect(200);
  });

  it('GET /campaign/:id should get a campaign by its ID', async () => {
    mockCampaignRepository.findOne.mockResolvedValue(campaignData);

    await request(app.getHttpServer())
      .get(`/campaign/someId`)
      .expect(200)
      .expect(campaignData);
  });

  it('GET /campaign/:id should throw 404 if campaign not found', async () => {
    mockCampaignRepository.findOne.mockResolvedValue(null);

    await request(app.getHttpServer())
      .get(`/campaign/someInvalidId`)
      .expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
