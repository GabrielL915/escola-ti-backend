import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { CreateObjectiveDto } from '../../../domain/dto/create-objective.dto';
import { UpdateObjectiveDto } from '../../../domain/dto/update-objective.dto';
import { Objective } from '../../../domain/entities/objetivo.entity';
import { ObjectiveRepository } from '../../../domain/repository/objective.repository';

export class ObjectiveRepositoryImpl implements ObjectiveRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async create(createObjectiveDto: CreateObjectiveDto): Promise<Objective> {
    try {
      const [objective] = await this.knex('objetivo')
        .insert(createObjectiveDto)
        .returning('*');
      return objective;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao criar Objetivo no banco',
        error,
      );
    }
  }

  async update(id: string, input: UpdateObjectiveDto): Promise<Objective> {
    try {
      const [updatedObjective] = await this.knex('objetivo')
        .where({ id })
        .update(input)
        .returning('*');
      return updatedObjective;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar Objetivo no banco',
        error,
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.knex('objetivo').where({ id }).del();
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao deletar Objetivo no banco',
        error,
      );
    }
  }

  async findAll(): Promise<Objective[]> {
    try {
      const objectives = await this.knex('objetivo').select('*');
      return objectives;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar Objetivos no banco',
        error,
      );
    }
  }

  async findOne(id: string): Promise<Objective> {
    try {
      const [objective] = await this.knex('objetivo').where({ id }).select('*');
      if (!objective) throw new NotFoundException('Objetivo não encontrado');
      const campaigns = await this.knex('campanha')
        .where({ id: objective.id_campanha })
        .select('*');
      objective.campanha = campaigns;
      return objective;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar Objetivo no banco',
        error,
      );
    }
  }
}
