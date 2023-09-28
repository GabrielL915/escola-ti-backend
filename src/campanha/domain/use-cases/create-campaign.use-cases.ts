import { Injectable } from '@nestjs/common';
import { Campaign } from '../entities/campaign.entity';
import { CampaignRepository } from '../repository/campaign.repository';
import { CreateCampaignDto } from '../dto/create-campaign.dto';

@Injectable()
export class CreateCampaignUseCase {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  async create(campaign: CreateCampaignDto): Promise<Campaign> {
    try {
      return this.campaignRepository.create(campaign);
    } catch (error) {
      throw new Error(error);
    }
  }
}
