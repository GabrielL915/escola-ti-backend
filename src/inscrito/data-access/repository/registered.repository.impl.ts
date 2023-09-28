import { UnauthorizedException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { CreateRegisteredDto } from 'src/inscrito/domain/dto/create-registered.dto';
import { UpdateRegisteredDto } from 'src/inscrito/domain/dto/update-registered.dto';
import { Registered } from 'src/inscrito/domain/entities/Registered.entity';
import { RegisteredRepository } from 'src/inscrito/domain/repository/Registered.repository';

export class RegisteredRepositoryImpl implements RegisteredRepository {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async create(createRegisteredDto: CreateRegisteredDto): Promise<Registered> {
    try {
      const [registered] = await this.knex('registered')
        .insert(createRegisteredDto)
        .returning('*');
      return registered;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async update(
    id: string,
    updateRegisteredDto: UpdateRegisteredDto,
  ): Promise<Registered> {
    try {
      const [updatedRegistered] = await this.knex('registered')
        .where({ id })
        .update(updateRegisteredDto)
        .returning('*');
      return updatedRegistered;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.knex('registered').where({ id }).del();
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findAll(): Promise<Registered[]> {
    try {
      const registereds = await this.knex('registered').select('*');
      return registereds;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findOne(id: string): Promise<Registered> {
    try {
      const [registered] = await this.knex('registered').where({ id }).select('*');
      return registered;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
