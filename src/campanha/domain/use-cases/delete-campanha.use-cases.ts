import { Injectable } from '@nestjs/common';
import { CampanhaRepository } from '../repository/campanha.repository';

@Injectable()
export class DeleteCampanhaUseCase {
  constructor(private readonly campanhaRepository: CampanhaRepository) {}

  async delete(id: string): Promise<void> {
    try {
      return this.campanhaRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
