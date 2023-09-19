import { Injectable } from '@nestjs/common';
import { Objetivo } from '../entities/objetivo.entity';
import { ObjetivoRepository } from '../repository/objetivo.repository';
import { UpdateObjetivoDto } from '../dto/update-objetivo.dto';

@Injectable()
export class UpdateObjetivoUseCase {
  constructor(private readonly objetivoRepository: ObjetivoRepository) {}

  async update(
    id: string,
    updateObjetivoDto: UpdateObjetivoDto,
  ): Promise<Objetivo> {
    try {
      return this.objetivoRepository.update(id, updateObjetivoDto);
    } catch (error) {
      throw new Error(error);
    }
  }
}
