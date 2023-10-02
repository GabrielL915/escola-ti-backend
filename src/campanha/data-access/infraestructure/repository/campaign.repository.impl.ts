import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { Campaign } from '../../../domain/entities/campaign.entity';
import { CampaignRepository } from '../../../domain/repository/campaign.repository';
import { CreateCampaignDto } from '../../../domain/dto/create-campaign.dto';
import { UpdateCampaignDto } from '../../../domain/dto/update-campaign.dto';

export class CampaignRepositoryImpl implements CampaignRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async create(input: CreateCampaignDto): Promise<Campaign> {
    try {
      const [campaign] = await this.knex('campanha')
        .insert(input)
        .returning('*');
      return campaign;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao criar Campanha no banco',
        error,
      );
    }
  }

  async update(
    id: string,
    updateCampaignDto: UpdateCampaignDto,
  ): Promise<Campaign> {
    try {
      const [updatedCampaign] = await this.knex('campanha')
        .where({ id })
        .update(updateCampaignDto)
        .returning('*');
      return updatedCampaign;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar Campanha no banco',
        error,
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.knex('campanha').where({ id }).del();
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao deletar Campanha no banco',
        error,
      );
    }
  }

  async findAll(): Promise<Campaign[]> {
    try {
      const campaigns = await this.knex('campanha').select('*');
      return campaigns;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar Campanhas no banco',
        error,
      );
    }
  }

  async findOne(id: string, motoboyId: string): Promise<Campaign> {
    try {
      const [campaign] = await this.knex('campanha').where({ id }).select('*');
      if (!campaign) throw new NotFoundException('Campanha não encontrada');
      const objectives = await this.knex('objetivo')
        .where({ id_campanha: id })
        .select('*');
      campaign.objetivos = objectives;
      const isRegistered = await this.knex('inscrito')
        .where({ id_entregador: motoboyId, id_campanha: id })
        .first();
      campaign.isRegistered = !!isRegistered;
      return campaign;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar Campanha no banco',
        error,
      );
    }
  }
}
