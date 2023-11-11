import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Objective } from '../entities/objetivo.entity';
import { ObjectiveRepository } from '../repository/objetivo.repository';
import { CreateObjectiveDto } from '../dto/create-objective.dto';

@Injectable()
export class CreateObjectiveUseCase {
  constructor(private readonly objectiveRepository: ObjectiveRepository) {}

  async create(input: CreateObjectiveDto): Promise<Objective> {
    try {
      return await this.objectiveRepository.create(input);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Erro ao criar Objetivo', error);
    }
  }
}