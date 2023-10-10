import { Test, TestingModule } from '@nestjs/testing';
import { DeleteCampaignUseCase } from './delete-campaign.use-cases';
import { CampaignRepository } from '../repository/campaign.repository';
import { InternalServerErrorException } from '@nestjs/common';

describe('DeleteCampaignUseCase', () => {
  let deleteCampaignUseCase: DeleteCampaignUseCase;
  let mockCampaignRepository: Partial<jest.Mocked<CampaignRepository>>;

  beforeEach(async () => {
    mockCampaignRepository = {
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteCampaignUseCase,
        {
          provide: CampaignRepository,
          useValue: mockCampaignRepository,
        },
      ],
    }).compile();

    deleteCampaignUseCase = module.get<DeleteCampaignUseCase>(
      DeleteCampaignUseCase,
    );
  });

  it('should throw InternalServerErrorException when campaignRepository.delete fails', async () => {
    const mockCampaignId = 'mockId';

    mockCampaignRepository.delete.mockRejectedValueOnce(
      new Error('Failed to delete a campaign from the repository'),
    );

    await expect(deleteCampaignUseCase.delete(mockCampaignId)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
