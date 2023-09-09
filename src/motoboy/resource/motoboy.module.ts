import { Module } from '@nestjs/common';
import { MotoboyController } from './motoboy.controller';
import { UpdateMotoboyUseCase } from '../domain/use-cases/update-motoboy';
import { MotoboyRepositoryImpl } from '../data-access/repostitory/motoboy.repository.impl';
import { MotoboyRepository } from '../domain/repository/motoboy.repository';

@Module({
  controllers: [MotoboyController],
  providers: [
    UpdateMotoboyUseCase,
    {
      provide: MotoboyRepository,
      useClass: MotoboyRepositoryImpl,
    },
  ],
})
export class MotoboyModule {}
