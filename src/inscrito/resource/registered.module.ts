import { Module } from '@nestjs/common';
import { RegisteredRepository } from '../domain/repository/registered.repository';
import { RegisteredRepositoryImpl } from '../data-access/infraestructure/repository/registered.repository.impl';
import { CreateRegisteredUseCase } from '../domain/use-cases/create-Registered.use-cases';
import { UpdateRegisteredUseCase } from '../domain/use-cases/update-registered.use-case';
import { DeleteRegisteredUseCase } from '../domain/use-cases/delete-registered.use-cases';
import { FindRegisteredUseCase } from '../domain/use-cases/find-registered.use-cases';
import { RegisteredController } from './registered.controller';

@Module({
  controllers: [RegisteredController],
  providers: [
    CreateRegisteredUseCase,
    UpdateRegisteredUseCase,
    DeleteRegisteredUseCase,
    FindRegisteredUseCase,
    {
      provide: RegisteredRepository,
      useClass: RegisteredRepositoryImpl,
    },
  ],
})
export class RegisteredModule {}
