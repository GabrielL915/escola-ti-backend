import { CreateCampaignDto } from '../dto/create-campaign.dto';
import { UpdateCampaignDto } from '../dto/update-campaign.dto';
import { Campaign } from '../entities/campaign.entity';

export abstract class CampaignRepository {
  abstract create(createCampaignDto: CreateCampaignDto): Promise<Campaign>;

  abstract update(id: string, updateCampaignDto: UpdateCampaignDto): Promise<Campaign>;

  abstract delete(id: string): Promise<void>;

  abstract findAll(): Promise<Campaign[]>;

  abstract findOne(id: string): Promise<Campaign>;
}
