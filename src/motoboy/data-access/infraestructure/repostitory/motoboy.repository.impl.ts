import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { Motoboy } from '../../../domain/entities/motoboy.entity';
import { CreateMotoboyDto } from '../../../domain/dto/create-motoboy.dto';
import { UpdateMotoboyDto } from '../../../domain/dto/update-motoboy.dto';
import { MotoboyRepository } from '../../../domain/repository/motoboy.repository';
import { NotFoundException } from '@nestjs/common';

export class MotoboyRepositoryImpl implements MotoboyRepository {
  constructor(@InjectKnex() private knex: Knex) {}
  async create(input: CreateMotoboyDto): Promise<Motoboy> {
    const [motoboy] = await this.knex('entregador')
      .insert(input)
      .returning([
        'nome',
        'sobrenome',
        'email',
        'telefone',
        'data_de_nascimento',
        'mochila',
      ]);
    return motoboy;
  }

  async findAll(): Promise<Motoboy[]> {
    const motoboys = await this.knex.from('entregador').select('*');
    return motoboys;
  }

  async findById(id: string): Promise<Motoboy> {
    const [motoboy] = await this.knex
      .from('entregador')
      .select('email')
      .where({ id: id });
    if (!motoboy) {
      throw new NotFoundException('Entregador não encontrado');
    }
    return motoboy;
  }

  async findByEmail(email: string): Promise<Motoboy> {
    const [motoboy] = await this.knex
      .from('entregador')
      .select('senha', 'email', 'status', 'id')
      .where({ email: email });
    if (!motoboy) {
      throw new NotFoundException('Entregador não encontrado');
    }
    return motoboy;
  }

  async profile(email: string): Promise<Motoboy> {
    const [motoboy] = await this.knex
      .from('entregador')
      .select('nome', 'aiqcoins')
      .where({ email: email });
    if (!motoboy) {
      throw new NotFoundException('Entregador não encontrado');
    }
    return motoboy;
  }

  async update(id: string, input: UpdateMotoboyDto): Promise<Motoboy> {
    const existingMotoboy = await this.knex('entregador')
      .where({ id: id })
      .select('*');
    if (existingMotoboy.length === 0) {
      throw new NotFoundException('Entregador não encontrado para atualizar');
    }
    const [motoboy] = await this.knex('entregador')
      .where({ id: id })
      .update(input)
      .returning([
        'nome',
        'sobrenome',
        'email',
        'telefone',
        'data_de_nascimento',
        'mochila',
      ]);
    return motoboy;
  }
}
