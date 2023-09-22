import { Module } from '@nestjs/common';
import { MotoboyController } from './motoboy.controller';
import { CreateMotoboyUseCase } from '../domain/use-cases/create-motoboy.use-case';
import { FindAllMotoboyUseCase } from '../domain/use-cases/find-all-motoboy.use-case';
import { FindByIdMotoboyUseCase } from '../domain/use-cases/find-by-id-motoboy.use-case';
import { FindByEmailMotoboyUseCase } from '../domain/use-cases/find-by-email-motoboy.use-case';
import { UpdateMotoboyUseCase } from '../domain/use-cases/update-motoboy.use-case';
import { MotoboyRepositoryImpl } from '../data-access/infraestructure/repostitory/motoboy.repository.impl';
import { MotoboyRepository } from '../domain/repository/motoboy.repository';


@Module({
  controllers: [MotoboyController],
  providers: [
    CreateMotoboyUseCase,
    FindAllMotoboyUseCase,
    FindByIdMotoboyUseCase,
    FindByEmailMotoboyUseCase,
    UpdateMotoboyUseCase,
    {
      provide: MotoboyRepository,
      useClass: MotoboyRepositoryImpl,
    },
  ],
  exports: [MotoboyRepository],
})
export class MotoboyModule {}
