import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCampanhaDto } from './dto/create-campanha.dto';
import { UpdateCampanhaDto } from './dto/update-campanha.dto';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { Campanha } from './entities/campanha.entity';

@Injectable()
export class CampanhaService {
  constructor(@InjectModel('Campanha') private readonly knex: Knex) {}

  async create(createCampanhaDto: CreateCampanhaDto): Promise<Campanha> {
    try {
      const [campanha] = await this.knex('campanha')
        .insert(createCampanhaDto)
        .returning('*');
      console.log('Campanha:', createCampanhaDto);
      return campanha;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  findAll() {
    return `This action returns all campanha`;
  }

  findOne(id: number) {
    return `This action returns a #${id} campanha`;
  }

  update(id: number, updateCampanhaDto: UpdateCampanhaDto) {
    return `This action updates a #${id} campanha`;
  }

  remove(id: number) {
    return `This action removes a #${id} campanha`;
  }
}
