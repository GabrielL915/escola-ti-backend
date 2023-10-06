import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Campaign } from '../entities/campaign.entity';
import { CampaignRepository } from '../repository/campaign.repository';
import { UpdateCampaignDto } from '../dto/update-campaign.dto';

@Injectable()
export class UpdateCampaignUseCase {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  async update(id: string, input: UpdateCampaignDto): Promise<Campaign> {
    try {
      return this.campaignRepository.update(id, input);
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar campanha',
        error,
      );
    }
  }
}
