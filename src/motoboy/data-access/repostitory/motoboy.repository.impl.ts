import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { Motoboy } from '../../domain/entities/motoboy.entity';
import { MotoboyRepository } from '../../domain/repository/motoboy.repository';

export class MotoboyRepositoryImpl implements MotoboyRepository {
    constructor(@InjectModel() private readonly knex: Knex) {}

    async update(id: string, input: Motoboy): Promise<Motoboy> {
        const [motoboy] = await this.knex('entregador').where({ id: id }).update(input).returning('*');
        return motoboy;
    }
}

