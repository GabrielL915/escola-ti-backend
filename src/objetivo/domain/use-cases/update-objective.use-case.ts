import { Injectable } from '@nestjs/common';
import { ObjectiveRepository } from '../repository/objetivo.repository';
import { UpdateObjectiveDto } from '../dto/update-objective.dto';
import { Objective } from '../entities/objetivo.entity';

@Injectable()
export class UpdateObjectiveUseCase {
  constructor(private readonly objectiveRepository: ObjectiveRepository) {}

  async update(
    id: string,
    updateObjectiveDto: UpdateObjectiveDto,
  ): Promise<Objective> {
    try {
      return this.objectiveRepository.update(id, updateObjectiveDto);
    } catch (error) {
      throw new Error(error);
    }
  }
}
