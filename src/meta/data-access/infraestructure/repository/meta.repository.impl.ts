import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { CreateMetaDto } from 'src/meta/domain/dto/create-meta.dto';
import { UpdateMetaDto } from 'src/meta/domain/dto/update-meta.dto';
import { Meta } from 'src/meta/domain/entities/meta.entity';
import { MetaRepository } from 'src/meta/domain/repository/meta.repository';

export class MetaRepositoryImpl implements MetaRepository {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async create(input: CreateMetaDto): Promise<Meta> {
    const [meta] = await this.knex('meta').insert(input).returning('*');
    return meta;
  }

  async update(id: string, input: UpdateMetaDto): Promise<Meta> {
    const [meta] = await this.knex('meta')
      .where({ id })
      .update(input)
      .returning('*');
    return meta;
  }

  async delete(id: string): Promise<void> {
    await this.knex('meta').where({ id }).del();
  }

  async findAll(): Promise<Meta[]> {
    const metas = await this.knex('meta').select('*');
    return metas;
  }

  async findOne(id: string): Promise<Meta> {
    const [meta] = await this.knex('meta').where({ id }).select('*');
    return meta;
  }
}
