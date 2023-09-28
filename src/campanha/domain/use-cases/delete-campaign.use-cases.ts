import { Injectable } from '@nestjs/common';
import { CampaignRepository } from '../repository/campaign.repository';

@Injectable()
export class DeleteCampaignUseCase {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  async delete(id: string): Promise<void> {
    try {
      return this.campaignRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
