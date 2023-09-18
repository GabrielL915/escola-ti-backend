import { Injectable } from '@nestjs/common';
import { Campanha } from '../entities/campanha.entity';
import { CampanhaRepository } from '../repository/campanha.repository';

@Injectable()
export class FindCampanhaUseCase {
  constructor(private readonly campanhaRepository: CampanhaRepository) {}

  async findAll(): Promise<Campanha[]> {
    try {
      return this.campanhaRepository.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number): Promise<Campanha> {
    try {
      return this.campanhaRepository.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
