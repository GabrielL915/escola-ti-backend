import { Injectable } from '@nestjs/common';
import { Registered } from '../entities/registered.entity';
import { RegisteredRepository } from '../repository/registered.repository';

@Injectable()
export class FindRegisteredUseCase {
  constructor(private readonly registeredRepository: RegisteredRepository) {}

  async findAll(): Promise<Registered[]> {
    try {
      return this.registeredRepository.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<Registered> {
    try {
      return this.registeredRepository.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
