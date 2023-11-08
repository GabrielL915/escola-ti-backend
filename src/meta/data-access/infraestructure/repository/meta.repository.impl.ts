import { InternalServerErrorException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { CreateMetaDto } from 'src/meta/domain/dto/create-meta.dto';
import { UpdateMetaDto } from 'src/meta/domain/dto/update-meta.dto';
import { Meta } from 'src/meta/domain/entities/meta.entity';
import { MetaRepository } from 'src/meta/domain/repository/meta.repository';

  export class MetaRepositoryImpl implements MetaRepository {
    constructor(@InjectKnex() private readonly knex: Knex) {}

    async create(input: CreateMetaDto): Promise<Meta> {
      try {
        const [meta] = await this.knex('meta_atingida')
          .insert(input)
          .returning('*');
        return meta;
      } catch (error) {
        throw new InternalServerErrorException(
          'Erro ao criar Meta no banco',
          error,
        );
      }
    }

  async update(
    idObjetivo: string,
    idInscrito: string,
    input: UpdateMetaDto,
  ): Promise<Meta> {
    try {
      const [meta] = await this.knex('meta_atingida')
        .where({ id_objetivo: idObjetivo, id_inscrito: idInscrito })
        .update(input)
        .returning('*');
      return meta;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar Meta no Banco',
        error,
      );
    }
  }

  async delete(idObjetivo: string, idInscrito: string): Promise<void> {
    try {
      await this.knex('meta_atingida')
        .where({ id_objetivo: idObjetivo, id_inscrito: idInscrito })
        .del();
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao deletar Meta no Banco',
        error,
      );
    }
  }

  async findAll(): Promise<Meta[]> {
    try {
      const metas = await this.knex('meta_atingida').select('*');
      return metas;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar Metas no Banco',
        error,
      );
    }
  }

  async findOne(idObjetivo: string, idInscrito: string): Promise<Meta> {
    try {
      const [meta] = await this.knex('meta_atingida')
        .where({ id_objetivo: idObjetivo, id_inscrito: idInscrito })
        .select('*');
      return meta;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar Meta no Banco',
        error,
      );
    }
  }
}
