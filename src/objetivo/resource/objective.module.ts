import { Module } from '@nestjs/common';
import { ObjectiveRepositoryImpl } from '../data-access/infraestructure/repository/objective.repository.impl';

import { CreateObjectiveUseCase } from '../domain/use-cases/create-objective.use-cases';
import { UpdateObjectiveUseCase } from '../domain/use-cases/update-objective.use-case';
import { DeleteObjectiveUseCase } from '../domain/use-cases/delete-objective.use-cases';
import { FindObjectiveUseCase } from '../domain/use-cases/find-objective.use-cases';
import { ObjectiveController } from './objective.controller';
import { ObjectiveRepository } from '../domain/repository/objective.repository';

@Module({
  imports: [],
  controllers: [ObjectiveController],
  providers: [
    {
      provide: ObjectiveRepository,
      useClass: ObjectiveRepositoryImpl,
    },
    CreateObjectiveUseCase,
    UpdateObjectiveUseCase,
    DeleteObjectiveUseCase,
    FindObjectiveUseCase,
  ],
  exports: [ObjectiveRepository],
})
export class ObjectiveModule {}
