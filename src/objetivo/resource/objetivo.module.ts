import { Module } from '@nestjs/common';
import { ObjetivoController } from '../resource/objetivo.controller';
import { ObjetivoRepository } from '../domain/repository/objetivo.repository';
import { ObjetivoRepositoryImpl } from '../data-access/repository/objetivo.repository.impl';

import { CreateObjetivoUseCase } from '../domain/use-cases/create-objetivo.use-cases';
import { UpdateObjetivoUseCase } from '../domain/use-cases/update-objetivo.use-case';
import { DeleteObjetivoUseCase } from '../domain/use-cases/delete-objetivo.use-cases';
import { FindObjetivoUseCase } from '../domain/use-cases/find-objetivo.use-cases';

@Module({
  controllers: [ObjetivoController],
  providers: [
    {
      provide: ObjetivoRepository,
      useClass: ObjetivoRepositoryImpl,
    },
    CreateObjetivoUseCase,
    UpdateObjetivoUseCase,
    DeleteObjetivoUseCase,
    FindObjetivoUseCase,
  ],
})
export class ObjetivoModule {}
