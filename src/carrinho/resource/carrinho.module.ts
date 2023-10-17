import { Module } from '@nestjs/common';
import { CarrinhoController } from './carrinho.controller';
import { CreateCarrinhoUseCase } from '../domain/use-cases/create-carrinho.use-case';
import { AddCarrinhoUseCase } from '../domain/use-cases/add-carrinho.use-case';
import { FinishCompraCarrinhoUseCase } from '../domain/use-cases/finish-compra-carrinho.use-case';
import { DeleteCarrinhoUseCase } from '../domain/use-cases/delete-carrinho.use-case';
import { CarrinhoRepositoryImpl } from '../data-access/infraestructure/repository/carrinho.repository.impl';
import { CarrinhoRepository } from '../domain/repository/carrinho.repository';

@Module({
  controllers: [CarrinhoController],
  providers: [
    CreateCarrinhoUseCase,
    AddCarrinhoUseCase,
    FinishCompraCarrinhoUseCase,
    DeleteCarrinhoUseCase,
    {
      provide: CarrinhoRepository,
      useClass: CarrinhoRepositoryImpl,
    },
  ],
})
export class CarrinhoModule {}
