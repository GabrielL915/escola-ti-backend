import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Campaign } from '../entities/campaign.entity';
import { CampaignRepository } from '../repository/campaign.repository';

@Injectable()
export class FindCampaignUseCase {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  async findAll(): Promise<Campaign[]> {
    try {
      return this.campaignRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar campanhas', error);
    }
  }

  async findOne(id: string, motoboyId: string): Promise<Campaign> {
    try {
      return this.campaignRepository.findOne(id, motoboyId);
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar campanha pro id',
        error,
      );
    }
  }
}
