import { Injectable } from '@nestjs/common';
import { Campaign } from '../entities/campaign.entity';
import { CampaignRepository } from '../repository/campaign.repository';
import { UpdateCampaignDto } from '../dto/update-campaign.dto';

@Injectable()
export class UpdateCampaignUseCase {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  async update(id: string, campaign: UpdateCampaignDto): Promise<Campaign> {
    try {
      return this.campaignRepository.update(id, campaign);
    } catch (error) {
      throw new Error(error);
    }
  }
}
