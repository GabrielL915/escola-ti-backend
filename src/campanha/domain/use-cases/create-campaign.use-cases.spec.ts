import { Test, TestingModule } from '@nestjs/testing';
import { CreateCampaignUseCase } from './create-campaign.use-cases';
import { CampaignRepository } from '../repository/campaign.repository';
import { InternalServerErrorException } from '@nestjs/common';
import { CreateCampaignDto } from '../dto/create-campaign.dto';

describe('CreateCampaignUseCase', () => {
  let createCampaignUseCase: CreateCampaignUseCase;
  let mockCampaignRepository: Partial<jest.Mocked<CampaignRepository>>;

  beforeEach(async () => {
    mockCampaignRepository = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCampaignUseCase,
        {
          provide: CampaignRepository,
          useValue: mockCampaignRepository,
        },
      ],
    }).compile();

    createCampaignUseCase = module.get<CreateCampaignUseCase>(
      CreateCampaignUseCase,
    );
  });

  it('should be defined', () => {
    expect(createCampaignUseCase).toBeDefined();
  });

  it('should throw InternalServerErrorException when campaignRepository.create fails', async () => {
    mockCampaignRepository.create.mockRejectedValueOnce(
      new Error('Erro ao criar campanha'),
    );

    const mockCampaignDto: CreateCampaignDto = {
      tipo: 'Test',
      dias: ['Segunda-feira'],
      horario_inicial: '2023-09-18T09:00:00Z',
      horario_final: '2023-09-18T17:00:00Z',
      limite_corridas_ignoradas: 3,
      limite_corridas_recusadas: 2,
      tempo_de_tolerancia: '2023-09-18T09:15:00Z',
      descricao: 'Descrição Teste',
    };

    await expect(createCampaignUseCase.create(mockCampaignDto)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
