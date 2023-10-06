import { InternalServerErrorException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { City } from '../../../domain/entities/city.entity';
import { CreateCityDto } from '../../../domain/dto/create-city.dto';
import { CityRepository } from '../../../domain/repository/city.repository';

export class CityRepositoryImpl implements CityRepository {
  constructor(@InjectKnex() private knex: Knex) {}

  async create(input: CreateCityDto): Promise<City> {
    try {
      const [city] = await this.knex('cidade')
        .insert({ cidade: input.city, uf: input.uf })
        .returning('id');
      return city;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro interno ao tentar registrar no banco.',
        error,
      );
    }
  }
}