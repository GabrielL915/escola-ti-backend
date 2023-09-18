import { UnauthorizedException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { CreateCampanhaDto } from 'src/campanha/domain/dto/create-campanha.dto';
import { Campanha } from 'src/campanha/domain/entities/campanha.entity';
import { CampanhaRepository } from 'src/campanha/domain/repository/campanha.repository';

export class CampanhaRepositoryImpl implements CampanhaRepository {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async create(createCampanhaDto: CreateCampanhaDto): Promise<Campanha> {
    try {
      console.log(createCampanhaDto, 'aaa');
      const [campanha] = await this.knex('campanha')
        .insert(createCampanhaDto)
        .returning('*');
      return campanha;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async update(id: number, campanha: Campanha): Promise<Campanha> {
    try {
      const [updatedCampanha] = await this.knex('campanha')
        .where({ id })
        .update(campanha)
        .returning('*');
      return updatedCampanha;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.knex('campanha').where({ id }).del();
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findAll(): Promise<Campanha[]> {
    try {
      const campanhas = await this.knex('campanha').select('*');
      return campanhas;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findOne(id: number): Promise<Campanha> {
    try {
      const [campanha] = await this.knex('campanha').where({ id }).select('*');
      return campanha;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
