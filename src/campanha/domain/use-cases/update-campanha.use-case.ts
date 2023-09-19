import { Injectable } from '@nestjs/common';
import { Campanha } from '../entities/campanha.entity';
import { CampanhaRepository } from '../repository/campanha.repository';
import { UpdateCampanhaDto } from '../dto/update-campanha.dto';

@Injectable()
export class UpdateCampanhaUseCase {
  constructor(private readonly campanhaRepository: CampanhaRepository) {}

  async update(id: string, campanha: UpdateCampanhaDto): Promise<Campanha> {
    try {
      return this.campanhaRepository.update(id, campanha);
    } catch (error) {
      throw new Error(error);
    }
  }
}
