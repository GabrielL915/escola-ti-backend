import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ObjectiveRepository } from '../repository/objetivo.repository';

@Injectable()
export class DeleteObjectiveUseCase {
  constructor(private readonly objectiveRepository: ObjectiveRepository) {}

  async delete(id: string): Promise<void> {
    try {
      return this.objectiveRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao deletar Objetivo', error);
    }
  }
}