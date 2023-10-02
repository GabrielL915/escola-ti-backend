import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Registered } from '../entities/registered.entity';
import { RegisteredRepository } from '../repository/registered.repository';
import { CreateRegisteredDto } from '../dto/create-registered.dto';

@Injectable()
export class CreateRegisteredUseCase {
  constructor(private readonly registeredRepository: RegisteredRepository) {}

  async create(input: CreateRegisteredDto): Promise<Registered> {
    try {
      return await this.registeredRepository.create(input);
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException('Erro ao criar Inscrito', error);
    }
  }
}