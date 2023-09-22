import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { Motoboy } from '../../../domain/entities/motoboy.entity';
import { CreateMotoboyDto } from '../../../domain/dto/create-motoboy.dto';
import { UpdateMotoboyDto } from '../../../domain/dto/update-motoboy.dto';
import { MotoboyRepository } from '../../../domain/repository/motoboy.repository';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class MotoboyRepositoryImpl implements MotoboyRepository {
  constructor(@InjectModel() private knex: Knex) {}
  async create(input: CreateMotoboyDto): Promise<Motoboy> {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro interno ao tentar registrar no banco.',
        error,
      );
    }
  }

  async findAll(): Promise<Motoboy[]> {
    const motoboys = await this.knex.from('entregador').select('*');
    return motoboys;
  }

  async findById(id: string): Promise<Motoboy> {
    const [motoboy] = await this.knex
      .from('entregador')
      .where({ id: id })
      .select('email');
    if (!motoboy) {
      throw new NotFoundException('Entregador não encontrado');
    }
    return motoboy;
  }

  async findByEmail(email: string): Promise<Motoboy> {
    try {
      const [motoboy] = await this.knex
        .from('entregador')
        .where({ email: email })
        .select('senha', 'email', 'ativo', 'id');
      return motoboy;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro interno ao tentar buscar Entregador no banco.',
        error,
      );
    }
  }

  async profile(email: string): Promise<Motoboy> {
    try {
      const [motoboy] = await this.knex
        .from('entregador')
        .select('nome', 'aiqcoins')
        .where({ email: email });
      return motoboy;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro interno ao tentar buscar Entregador no banco.',
        error,
      );
    }
  }

  async update(id: string, input: UpdateMotoboyDto): Promise<Motoboy> {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro interno ao tentar atualizar Entregador no banco.',
        error,
      );
    }
  }
}
