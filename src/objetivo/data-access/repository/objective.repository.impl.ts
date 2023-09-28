import { UnauthorizedException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { CreateObjectiveDto } from 'src/objetivo/domain/dto/create-objective.dto';
import { UpdateObjectiveDto } from 'src/objetivo/domain/dto/update-objective.dto';
import { Objective } from 'src/objetivo/domain/entities/objetivo.entity';
import { ObjectiveRepository } from 'src/objetivo/domain/repository/objetivo.repository';


export class ObjectiveRepositoryImpl implements ObjectiveRepository {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async create(createObjectiveDto: CreateObjectiveDto): Promise<Objective> {
    try {
      const [objective] = await this.knex('objective')
        .insert(createObjectiveDto)
        .returning('*');
      return objective;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async update(
    id: string,
    updateObjectiveDto: UpdateObjectiveDto,
  ): Promise<Objective> {
    try {
      const [updatedObjective] = await this.knex('objective')
        .where({ id })
        .update(updateObjectiveDto)
        .returning('*');
      return updatedObjective;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.knex('objective').where({ id }).del();
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findAll(): Promise<Objective[]> {
    try {
      const objectives = await this.knex('objective').select('*');
      return objectives;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findOne(id: string): Promise<Objective> {
    try {
      const [objective] = await this.knex('objective').where({ id }).select('*');
      return objective;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
