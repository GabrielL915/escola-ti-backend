import { UnauthorizedException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { CreateObjetivoDto } from 'src/objetivo/domain/dto/create-objetivo.dto';
import { UpdateObjetivoDto } from 'src/objetivo/domain/dto/update-objetivo.dto';
import { Objetivo } from 'src/objetivo/domain/entities/objetivo.entity';
import { ObjetivoRepository } from 'src/objetivo/domain/repository/objetivo.repository';

export class ObjetivoRepositoryImpl implements ObjetivoRepository {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async create(createObjetivoDto: CreateObjetivoDto): Promise<Objetivo> {
    try {
      const [objetivo] = await this.knex('objetivo')
        .insert(createObjetivoDto)
        .returning('*');
      return objetivo;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async update(
    id: string,
    updateObjetivoDto: UpdateObjetivoDto,
  ): Promise<Objetivo> {
    try {
      const [updatedObjetivo] = await this.knex('objetivo')
        .where({ id })
        .update(updateObjetivoDto)
        .returning('*');
      return updatedObjetivo;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.knex('objetivo').where({ id }).del();
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findAll(): Promise<Objetivo[]> {
    try {
      const objetivos = await this.knex('objetivo').select('*');
      return objetivos;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findOne(id: string): Promise<Objetivo> {
    try {
      const [objetivo] = await this.knex('objetivo').where({ id }).select('*');
      return objetivo;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
