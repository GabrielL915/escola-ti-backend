import { Injectable } from '@nestjs/common';
import { Campaign } from '../entities/campaign.entity';
import { CampaignRepository } from '../repository/campaign.repository';

@Injectable()
export class FindCampaignUseCase {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  async findAll(): Promise<Campaign[]> {
    try {
      return this.campaignRepository.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<Campaign> {
    try {
      return this.campaignRepository.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
