import { Module } from '@nestjs/common';
import { CarrinhoController } from './carrinho.controller';
import { CreateCarrinhoUseCase } from '../domain/use-cases/create-carrinho.use-case';
import { AddCarrinhoUseCase } from '../domain/use-cases/add-carrinho.use-case';
import { FindItensCarrinhoUseCase } from '../domain/use-cases/find-item-by-id-carrinho.use-case';
import { FinishCompraCarrinhoUseCase } from '../domain/use-cases/finish-compra-carrinho.use-case';
import { DeleteCarrinhoUseCase } from '../domain/use-cases/delete-carrinho.use-case';
import { CarrinhoRepositoryImpl } from '../data-access/infraestructure/repository/carrinho.repository.impl';
import { CarrinhoRepository } from '../domain/repository/carrinho.repository';
import { ProductsModule } from '../../products/resource/products.module';
import { ItemCarrinhoModule } from '../../item-carrinho/resource/item-carrinho.module';
import { CARRINHO_FIND_ITENS_BY_ID_PROVIDER } from '../../shared/constants/injection-tokens';
import { StockModule } from '../../stock/resource/stock.module';
import { MotoboyModule } from '../../motoboy/resource/motoboy.module';
import { AuthModule } from '../../auth/resource/auth.module';
@Module({
  imports: [
    ProductsModule,
    ItemCarrinhoModule,
    StockModule,
    MotoboyModule,
    AuthModule,
  ],
  controllers: [CarrinhoController],
  providers: [
    CreateCarrinhoUseCase,
    AddCarrinhoUseCase,
    FinishCompraCarrinhoUseCase,
    DeleteCarrinhoUseCase,
    FindItensCarrinhoUseCase,
    {
      provide: CarrinhoRepository,
      useClass: CarrinhoRepositoryImpl,
    },
    {
      provide: CARRINHO_FIND_ITENS_BY_ID_PROVIDER,
      useClass: FindItensCarrinhoUseCase,
    },
  ],
})
export class CarrinhoModule {}
