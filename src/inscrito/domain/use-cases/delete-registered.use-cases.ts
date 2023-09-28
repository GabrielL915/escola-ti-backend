import { Injectable } from '@nestjs/common';
import { RegisteredRepository } from '../repository/registered.repository';

@Injectable()
export class DeleteRegisteredUseCase {
  constructor(private readonly registeredRepository: RegisteredRepository) {}

  async delete(id: string): Promise<void> {
    try {
      return this.registeredRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
