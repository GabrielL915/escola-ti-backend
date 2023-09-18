import { Injectable } from '@nestjs/common';
import { Campanha } from '../entities/campanha.entity';
import { CampanhaRepository } from '../repository/campanha.repository';
import { CreateCampanhaDto } from '../dto/create-campanha.dto';

@Injectable()
export class CreateCampanhaUseCase {
  constructor(private readonly campanhaRepository: CampanhaRepository) {}

  async create(campanha: CreateCampanhaDto): Promise<Campanha> {
    try {
      return this.campanhaRepository.create(campanha);
    } catch (error) {
      throw new Error(error);
    }
  }
}
