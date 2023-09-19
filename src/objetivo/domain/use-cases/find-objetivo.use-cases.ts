import { Injectable } from '@nestjs/common';
import { Objetivo } from '../entities/objetivo.entity';
import { ObjetivoRepository } from '../repository/objetivo.repository';

@Injectable()
export class FindObjetivoUseCase {
  constructor(private readonly objetivoRepository: ObjetivoRepository) {}

  async findAll(): Promise<Objetivo[]> {
    try {
      return this.objetivoRepository.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<Objetivo> {
    try {
      return this.objetivoRepository.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
