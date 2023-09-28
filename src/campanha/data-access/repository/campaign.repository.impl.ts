import { UnauthorizedException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { Campaign } from '../../domain/entities/campaign.entity';
import { CampaignRepository } from '../../domain/repository/campaign.repository';
import { CreateCampaignDto } from '../../domain/dto/create-campaign.dto';
import { UpdateCampaignDto } from '../../domain/dto/update-campaign.dto';

export class CampaignRepositoryImpl implements CampaignRepository {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async create(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    try {
      const [campaign] = await this.knex('campaign')
        .insert(createCampaignDto)
        .returning('*');
      return campaign;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async update(
    id: string,
    updateCampaignDto: UpdateCampaignDto,
  ): Promise<Campaign> {
    try {
      const [updatedCampaign] = await this.knex('campaign')
        .where({ id })
        .update(updateCampaignDto)
        .returning('*');
      return updatedCampaign;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.knex('campaign').where({ id }).del();
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findAll(): Promise<Campaign[]> {
    try {
      const campaigns = await this.knex('campaign').select('*');
      return campaigns;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findOne(id: string): Promise<Campaign> {
    try {
      const [campaign] = await this.knex('campaign').where({ id }).select('*');
      return campaign;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
