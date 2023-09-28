import { Injectable } from '@nestjs/common';
import { Registered } from '../entities/registered.entity';
import { RegisteredRepository } from '../repository/registered.repository';
import { UpdateRegisteredDto } from '../dto/update-registered.dto';

@Injectable()
export class UpdateRegisteredUseCase {
  constructor(private readonly registeredRepository: RegisteredRepository) {}

  async update(
    id: string,
    updateRegisteredDto: UpdateRegisteredDto,
  ): Promise<Registered> {
    try {
      return this.registeredRepository.update(id, updateRegisteredDto);
    } catch (error) {
      throw new Error(error);
    }
  }
}
