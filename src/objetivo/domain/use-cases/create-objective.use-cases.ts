import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Objective } from '../entities/objetivo.entity';
import { ObjectiveRepository } from '../repository/objective.repository';
import { CreateObjectiveDto } from '../dto/create-objective.dto';

@Injectable()
export class CreateObjectiveUseCase {
  constructor(private readonly objectiveRepository: ObjectiveRepository) {}

  async create(input: CreateObjectiveDto): Promise<Objective> {
    try {
      return await this.objectiveRepository.create(input);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar Objetivo', error);
    }
  }
}
