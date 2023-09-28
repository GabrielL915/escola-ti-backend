import { Injectable } from '@nestjs/common';
import { Registered } from '../entities/Registered.entity';
import { RegisteredRepository } from '../repository/Registered.repository';
import { CreateRegisteredDto } from '../dto/create-registered.dto';

@Injectable()
export class CreateRegisteredUseCase {
  constructor(private readonly registeredRepository: RegisteredRepository) {}

  async create(createRegisteredDto: CreateRegisteredDto): Promise<Registered> {
    try {
      return this.registeredRepository.create(createRegisteredDto);
    } catch (error) {
      throw new Error(error);
    }
  }
}
