import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Campaign } from '../entities/campaign.entity';
import { CampaignRepository } from '../repository/campaign.repository';
import { CreateCampaignDto } from '../dto/create-campaign.dto';

@Injectable()
export class CreateCampaignUseCase {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  async create(input: CreateCampaignDto): Promise<Campaign> {
    try {
      return await this.campaignRepository.create(input);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar campanha', error);
    }
  }
}
