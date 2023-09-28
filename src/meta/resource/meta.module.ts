import { Module } from '@nestjs/common';
import { MetaController } from './meta.controller';
import { MetaRepository } from '../domain/repository/meta.repository';
import { MetaRepositoryImpl } from '../data-access/repository/meta.repository.impl';

import { CreateMetaUseCase } from '../domain/use-cases/create-meta.use-cases';
import { UpdateMetaUseCase } from '../domain/use-cases/update-meta.use-case';
import { DeleteMetaUseCase } from '../domain/use-cases/delete-meta.use-cases';
import { FindMetaUseCase } from '../domain/use-cases/find-meta.use-cases';

@Module({
  controllers: [MetaController],
  providers: [
    {
      provide: MetaRepository,
      useClass: MetaRepositoryImpl,
    },
    CreateMetaUseCase,
    UpdateMetaUseCase,
    DeleteMetaUseCase,
    FindMetaUseCase,
  ],
})
export class MetaModule {}
