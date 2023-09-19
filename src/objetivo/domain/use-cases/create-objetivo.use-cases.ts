import { Injectable } from '@nestjs/common';
import { Objetivo } from '../entities/objetivo.entity';
import { ObjetivoRepository } from '../repository/objetivo.repository';
import { CreateObjetivoDto } from '../dto/create-objetivo.dto';

@Injectable()
export class CreateObjetivoUseCase {
  constructor(private readonly objetivoRepository: ObjetivoRepository) {}

  async create(createObjetivoDto: CreateObjetivoDto): Promise<Objetivo> {
    try {
      return this.objetivoRepository.create(createObjetivoDto);
    } catch (error) {
      throw new Error(error);
    }
  }
}
