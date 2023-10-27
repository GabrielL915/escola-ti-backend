import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { CreateSubscribeDto } from '../../../domain/dto/create-subscribe.dto';
import { UpdateSubscribeDto } from '../../../domain/dto/update-subscribe.dto';
import { Subscribe } from '../../../domain/entities/subscribe.entity';
import { SubscribeRepository } from '../../../domain/repository/subscribe.repository';

export class SubscribeRepositoryImpl implements SubscribeRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async create(input: CreateSubscribeDto): Promise<Subscribe> {
    try {
      const [registered] = await this.knex('inscrito')
        .insert(input)
        .returning('*');
      return registered;
    } catch (error) {
      throw new InternalServerErrorException(
        console.log(error),
        'Erro ao criar Inscrito no banco',
      );
    }
  }

  async update(id: string, input: UpdateSubscribeDto): Promise<Subscribe> {
    try {
      const [updatedSubscribe] = await this.knex('inscrito')
        .where({ id })
        .update(input)
        .returning('*');
      return updatedSubscribe;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar Inscrito no banco',
        error,
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.knex('inscrito').where({ id }).del();
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao deletar Inscrito no banco',
        error,
      );
    }
  }

  async findAll(): Promise<Subscribe[]> {
    try {
      const subscribes = await this.knex('inscrito').select('*');
      return subscribes;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar Inscritos no banco',
        error,
      );
    }
  }

  async findOne(id: string): Promise<Subscribe> {
    try {
      const [subscribe] = await this.knex('inscrito')
        .where({ id })
        .select('*');
      if (!subscribe) throw new NotFoundException('Inscrito não encontrado');
      return subscribe;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar Inscrito no banco',
        error,
      );
    }
  }
}
