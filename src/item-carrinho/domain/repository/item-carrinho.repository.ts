import { ItemCarrinho } from '../entities/item-carrinho.entity';

export abstract class ItemCarrinhoRepository {
  abstract listItemCarrinho(): Promise<ItemCarrinho[]>;
}
