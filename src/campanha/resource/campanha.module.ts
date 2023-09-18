import { Module } from '@nestjs/common';
import { CampanhaController } from './campanha.controller';
import { CampanhaRepository } from '../domain/repository/campanha.repository';
import { CampanhaRepositoryImpl } from '../data-access/repository/campanha.repository.impl';
import { CreateCampanhaUseCase } from '../domain/use-cases/create-campanha.use-cases';
import { UpdateCampanhaUseCase } from '../domain/use-cases/update-campanha.use-case';
import { DeleteCampanhaUseCase } from '../domain/use-cases/delete-campanha.use-cases';
import { FindCampanhaUseCase } from '../domain/use-cases/find-campanha.use-cases';

@Module({
  controllers: [CampanhaController],
  providers: [
    {
      provide: CampanhaRepository,
      useClass: CampanhaRepositoryImpl,
    },
    CreateCampanhaUseCase,
    UpdateCampanhaUseCase,
    DeleteCampanhaUseCase,
    FindCampanhaUseCase,
  ],
})
export class CampanhaModule {}
