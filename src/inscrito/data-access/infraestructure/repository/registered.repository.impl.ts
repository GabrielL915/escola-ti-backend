import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { CreateRegisteredDto } from '../../../domain/dto/create-registered.dto';
import { UpdateRegisteredDto } from '../../../domain/dto/update-registered.dto';
import { Registered } from '../../../domain/entities/registered.entity';
import { RegisteredRepository } from '../../../domain/repository/registered.repository';

export class RegisteredRepositoryImpl implements RegisteredRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async create(input: CreateRegisteredDto): Promise<Registered> {
    try {
      const [registered] = await this.knex('inscrito')
        .insert(input)
        .returning('*');
      return registered;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao criar Inscrito no banco',
        error,
      );
    }
  }

  async update(id: string, input: UpdateRegisteredDto): Promise<Registered> {
    try {
      const [updatedRegistered] = await this.knex('inscrito')
        .where({ id })
        .update(input)
        .returning('*');
      return updatedRegistered;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar Inscrito no banco',
        error,
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.knex('registered').where({ id }).del();
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao deletar Inscrito no banco',
        error,
      );
    }
  }

  async findAll(): Promise<Registered[]> {
    try {
      const registereds = await this.knex('inscrito').select('*');
      return registereds;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar Inscritos no banco',
        error,
      );
    }
  }

  async findOne(id: string): Promise<Registered> {
    try {
      const [registered] = await this.knex('inscrito')
        .where({ id })
        .select('*');
      if (!registered) throw new NotFoundException('Inscrito não encontrado');
      return registered;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar Inscrito no banco',
        error,
      );
    }
  }
}
