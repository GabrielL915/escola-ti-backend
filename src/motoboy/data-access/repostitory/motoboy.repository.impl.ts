import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { Motoboy } from '../../domain/entities/motoboy.entity';
import { MotoboyRepository } from '../../domain/repository/motoboy.repository';
import { HttpException } from '@nestjs/common';

export class MotoboyRepositoryImpl implements MotoboyRepository {
  constructor(@InjectModel() private knex: Knex) {}

  async update(id: string, input: Motoboy): Promise<Motoboy> {
    const existingMotoboy = await this.knex('entregador')
      .where({ id: id })
      .select('*');
    if (existingMotoboy.length === 0) {
      throw new HttpException('Entregador not found', 404);
    }

    const [motoboy] = await this.knex('entregador')
      .where({ id: id })
      .update(input)
      .returning('*');
    return motoboy;
  }
}
