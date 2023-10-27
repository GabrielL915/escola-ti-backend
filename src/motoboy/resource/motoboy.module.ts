import { Module } from '@nestjs/common';
import { MotoboyController } from './motoboy.controller';
import { CreateMotoboyUseCase } from '../domain/use-cases/create-motoboy.use-case';
import { FindAllMotoboyUseCase } from '../domain/use-cases/find-all-motoboy.use-case';
import { FindByIdMotoboyUseCase } from '../domain/use-cases/find-by-id-motoboy.use-case';
import { FindByEmailMotoboyUseCase } from '../domain/use-cases/find-by-email-motoboy.use-case';
import { UpdateMotoboyUseCase } from '../domain/use-cases/update-motoboy.use-case';
import { DeleteMotoboyUseCase } from '../domain/use-cases/delete-motoboy.use-case';
import { MotoboyRepositoryImpl } from '../data-access/infraestructure/repostitory/motoboy.repository.impl';
import { MotoboyRepository } from '../domain/repository/motoboy.repository';
import {
  MOTOBOY_UPDATE_PROVIDER,
  MOTOBOY_FIND_BY_ID_PROVIDER,
} from '../../shared/constants/injection-tokens';
import { UpdateMotoboyAiqcoinsUseCase } from '../domain/use-cases/update-motoboy-aiqcoins.use-case';

@Module({
  imports: [],
  controllers: [MotoboyController],
  providers: [
    CreateMotoboyUseCase,
    FindAllMotoboyUseCase,
    FindByIdMotoboyUseCase,
    FindByEmailMotoboyUseCase,
    UpdateMotoboyUseCase,
    UpdateMotoboyAiqcoinsUseCase,
    DeleteMotoboyUseCase,
    {
      provide: MotoboyRepository,
      useClass: MotoboyRepositoryImpl,
    },
    {
      provide: MOTOBOY_UPDATE_PROVIDER,
      useClass: UpdateMotoboyAiqcoinsUseCase,
    },
    {
      provide: MOTOBOY_FIND_BY_ID_PROVIDER,
      useClass: FindByIdMotoboyUseCase,
    },
  ],
  exports: [
    MotoboyRepository,
    UpdateMotoboyUseCase,
    MOTOBOY_UPDATE_PROVIDER,
    MOTOBOY_FIND_BY_ID_PROVIDER,
    FindByIdMotoboyUseCase,
    UpdateMotoboyAiqcoinsUseCase
  ],
})
export class MotoboyModule {}
