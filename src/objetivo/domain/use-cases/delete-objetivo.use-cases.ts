import { Injectable } from '@nestjs/common';
import { ObjetivoRepository } from '../repository/objetivo.repository';

@Injectable()
export class DeleteObjetivoUseCase {
  constructor(private readonly objetivoRepository: ObjetivoRepository) {}

  async delete(id: string): Promise<void> {
    try {
      return this.objetivoRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
