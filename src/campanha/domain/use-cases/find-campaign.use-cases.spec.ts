import { Test, TestingModule } from '@nestjs/testing';
import { FindCampaignUseCase } from './find-campaign.use-cases';
import { CampaignRepository } from '../repository/campaign.repository';
import { InternalServerErrorException } from '@nestjs/common';

describe('FindCampaignUseCase', () => {
  let findCampaignUseCase: FindCampaignUseCase;
  let mockCampaignRepository: Partial<jest.Mocked<CampaignRepository>>;

  beforeEach(async () => {
    mockCampaignRepository = {
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindCampaignUseCase,
        {
          provide: CampaignRepository,
          useValue: mockCampaignRepository,
        },
      ],
    }).compile();

    findCampaignUseCase = module.get<FindCampaignUseCase>(FindCampaignUseCase);
  });

  it('should throw InternalServerErrorException when campaignRepository.findAll fails', async () => {
    mockCampaignRepository.findAll.mockRejectedValueOnce(
      new Error('Failed to retrieve campaigns from the repository'),
    );

    await expect(findCampaignUseCase.findAll()).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it('should throw InternalServerErrorException when campaignRepository.findOne fails', async () => {
    const mockCampaignId = 'mockId';
    const mockMotoboyId = 'mockMotoboyId';

    mockCampaignRepository.findOne.mockRejectedValueOnce(
      new Error('Failed to retrieve a campaign from the repository'),
    );

    await expect(
      findCampaignUseCase.findOne(mockCampaignId, mockMotoboyId),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
