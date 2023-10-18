import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ObjectiveRepository } from '../repository/objective.repository';
import { UpdateObjectiveDto } from '../dto/update-objective.dto';
import { Objective } from '../entities/objetivo.entity';

@Injectable()
export class UpdateObjectiveUseCase {
  constructor(private readonly objectiveRepository: ObjectiveRepository) {}

  async update(
    id: string,
    input: UpdateObjectiveDto,
  ): Promise<Objective> {
    try {
      return await this.objectiveRepository.update(id, input);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar Objetivo', error);
    }
  }
}
