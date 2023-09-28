import { Injectable } from '@nestjs/common';
import { Objective } from '../entities/objetivo.entity';
import { ObjectiveRepository } from '../repository/objetivo.repository';
import { CreateObjectiveDto } from '../dto/create-objective.dto';

@Injectable()
export class CreateObjectiveUseCase {
  constructor(private readonly objectiveRepository: ObjectiveRepository) {}

  async create(createObjectiveDto: CreateObjectiveDto): Promise<Objective> {
    try {
      return this.objectiveRepository.create(createObjectiveDto);
    } catch (error) {
      throw new Error(error);
    }
  }
}
