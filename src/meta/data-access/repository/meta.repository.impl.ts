import { UnauthorizedException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { CreateMetaDto } from 'src/meta/domain/dto/create-meta.dto';
import { UpdateMetaDto } from 'src/meta/domain/dto/update-meta.dto';
import { Meta } from 'src/meta/domain/entities/meta.entity';
import { MetaRepository } from 'src/meta/domain/repository/meta.repository';

export class MetaRepositoryImpl implements MetaRepository {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async create(createMetaDto: CreateMetaDto): Promise<Meta> {
    try {
      const [meta] = await this.knex('meta')
        .insert(createMetaDto)
        .returning('*');
      return meta;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async update(
    id: string,
    updateMetaDto: UpdateMetaDto,
  ): Promise<Meta> {
    try {
      const [updatedMeta] = await this.knex('meta')
        .where({ id })
        .update(updateMetaDto)
        .returning('*');
      return updatedMeta;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.knex('meta').where({ id }).del();
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findAll(): Promise<Meta[]> {
    try {
      const Metas = await this.knex('metas').select('*');
      return Metas;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findOne(id: string): Promise<Meta> {
    try {
      const [meta] = await this.knex('meta').where({ id }).select('*');
      return meta;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
