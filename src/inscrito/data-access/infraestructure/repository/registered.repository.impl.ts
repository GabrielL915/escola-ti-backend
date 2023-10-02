import { NotFoundException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { CreateRegisteredDto } from '../../../domain/dto/create-registered.dto';
import { UpdateRegisteredDto } from '../../../domain/dto/update-registered.dto';
import { Registered } from '../../../domain/entities/registered.entity';
import { RegisteredRepository } from '../../../domain/repository/registered.repository';

export class RegisteredRepositoryImpl implements RegisteredRepository {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async create(input: CreateRegisteredDto): Promise<Registered> {
    const [registered] = await this.knex('inscrito')
      .insert(input)
      .returning('*');
    return registered;
  }

  async update(
    id: string,
    input: UpdateRegisteredDto,
  ): Promise<Registered> {
    const [updatedRegistered] = await this.knex('inscrito')
      .where({ id })
      .update(input)
      .returning('*');
    return updatedRegistered;
  }

  async delete(id: string): Promise<void> {
    await this.knex('registered').where({ id }).del();
  }

  async findAll(): Promise<Registered[]> {
    const registereds = await this.knex('inscrito').select('*');
    return registereds;
  }

  async findOne(id: string): Promise<Registered> {
    const [registered] = await this.knex('inscrito')
      .where({ id })
      .select('*');
    if (!registered) throw new NotFoundException('Inscrito não encontrado');
    return registered;
  }
}
