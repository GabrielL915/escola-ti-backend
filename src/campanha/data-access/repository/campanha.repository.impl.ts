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

  async findAll(): Promise<Campanha[]> {
    try {
      const campanhas = await this.knex('campanha').select('*');
      return campanhas;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
