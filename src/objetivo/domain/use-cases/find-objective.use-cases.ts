import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Objective } from '../entities/objetivo.entity';
import { ObjectiveRepository } from '../repository/objective.repository';

@Injectable()
export class FindObjectiveUseCase {
  constructor(private readonly objectiveRepository: ObjectiveRepository) {}

  async findAll(): Promise<Objective[]> {
    try {
      return await this.objectiveRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar Objetivos', error);
    }
  }

  async findOne(id: string): Promise<Objective> {
    try {
      return await this.objectiveRepository.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar Objetivo por id', error);
    }
  }
}
