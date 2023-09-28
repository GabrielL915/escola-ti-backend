import { Injectable } from '@nestjs/common';
import { Objective } from '../entities/objetivo.entity';
import { ObjectiveRepository } from '../repository/objetivo.repository';

@Injectable()
export class FindObjectiveUseCase {
  constructor(private readonly objectiveRepository: ObjectiveRepository) {}

  async findAll(): Promise<Objective[]> {
    try {
      return this.objectiveRepository.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<Objective> {
    try {
      return this.objectiveRepository.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
