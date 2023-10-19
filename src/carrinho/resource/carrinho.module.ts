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
import { ItemCarrinhoModule } from 'src/item-carrinho/resource/item-carrinho.module';
@Module({
  imports: [ProductsModule, ItemCarrinhoModule],
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
  ],
})
export class CarrinhoModule {}
