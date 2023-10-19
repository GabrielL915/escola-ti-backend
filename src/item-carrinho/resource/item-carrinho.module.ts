import { Module } from '@nestjs/common';
import { ItemCarrinhoController } from './item-carrinho.controller';
import { CreateItemCarrinhoUseCase } from '../domain/use-cases/create-item-carrinho.use-case';
import { ItemCarrinhoRepository} from '../domain/repository/item-carrinho.repository';
import { ItemCarrinhoRepositoryImpl } from '../data-access/infraestructure/repository/item-carrinho.repository.impl';
import { ITEM_CARRINHO_CREATE_PROVIDER } from '../../shared/constants/injection-tokens';


@Module({
  controllers: [ItemCarrinhoController],
  providers: [
    CreateItemCarrinhoUseCase,
    {
      provide: ItemCarrinhoRepository,
      useClass: ItemCarrinhoRepositoryImpl,
    },
    {
      provide: ITEM_CARRINHO_CREATE_PROVIDER,
      useClass: CreateItemCarrinhoUseCase,
    }
  ],
  exports: [
    CreateItemCarrinhoUseCase,
    ITEM_CARRINHO_CREATE_PROVIDER
  ]
})
export class ItemCarrinhoModule {}
