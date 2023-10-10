import { Test, TestingModule } from '@nestjs/testing';
import { UpdateCampaignUseCase } from './update-campaign.use-case';
import { CampaignRepository } from '../repository/campaign.repository';
import { InternalServerErrorException } from '@nestjs/common';

describe('UpdateCampaignUseCase', () => {
  let updateCampaignUseCase: UpdateCampaignUseCase;
  let mockCampaignRepository: Partial<jest.Mocked<CampaignRepository>>;

  beforeEach(async () => {
    mockCampaignRepository = {
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateCampaignUseCase,
        {
          provide: CampaignRepository,
          useValue: mockCampaignRepository,
        },
      ],
    }).compile();

    updateCampaignUseCase = module.get<UpdateCampaignUseCase>(
      UpdateCampaignUseCase,
    );
  });

  it('should throw InternalServerErrorException when campaignRepository.update fails', async () => {
    const mockCampaignId = 'mockId';
    const mockUpdateDto = {
      id: 'mockId',
      tipo: 'Test Atualizado',
      dias: ['Segunda-feira'],
      horario_inicial: '2023-09-18T09:00:00Z',
      horario_final: '2023-09-18T17:00:00Z',
      limite_corridas_ignoradas: 3,
      limite_corridas_recusadas: 2,
      tempo_de_tolerancia: '2023-09-18T09:15:00Z',
      descricao: 'Descrição Teste Atualizada',
    };

    mockCampaignRepository.update.mockRejectedValueOnce(
      new Error('Failed to update campaign in the repository'),
    );

    await expect(
      updateCampaignUseCase.update(mockCampaignId, mockUpdateDto),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
