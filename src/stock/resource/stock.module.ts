import { Module } from '@nestjs/common';
import { CreateStockUseCase } from '../domain/use-cases/create-stock.use-case';
import { FindAllStockUseCase } from '../domain/use-cases/find-all-stock.use-case';
import { FindByIdStockUseCase } from '../domain/use-cases/find-by-id-stock.use-case';
import { UpdateStockUseCase } from '../domain/use-cases/update-stock.use-case';
import { DeleteStockUseCase } from '../domain/use-cases/delete-stock.use-case';
import { StockRepository } from '../domain/repository/stock.repository';
import { StockRepositoryImpl } from '../data-access/infraestructure/repository/stock.repository.impl';
import {
  STOCK_CREATE_PROVIDER,
  STOCK_FIND_BY_ID_PROVIDER,
  STOCK_DELETE_PROVIDER,
} from '../../shared/constants/injection-tokens';

@Module({
  providers: [
    CreateStockUseCase,
    FindAllStockUseCase,
    FindByIdStockUseCase,
    UpdateStockUseCase,
    DeleteStockUseCase,
    {
      provide: StockRepository,
      useClass: StockRepositoryImpl,
    },
    {
      provide: STOCK_CREATE_PROVIDER,
      useClass: CreateStockUseCase,
    },
    {
      provide: STOCK_FIND_BY_ID_PROVIDER,
      useClass: FindByIdStockUseCase,
    },
    {
      provide: STOCK_DELETE_PROVIDER,
      useClass: DeleteStockUseCase,
    },
  ],
  exports: [
    CreateStockUseCase,
    FindByIdStockUseCase,
    DeleteStockUseCase,
    STOCK_CREATE_PROVIDER,
    STOCK_FIND_BY_ID_PROVIDER,
    STOCK_DELETE_PROVIDER
  ],
})
export class StockModule {}
