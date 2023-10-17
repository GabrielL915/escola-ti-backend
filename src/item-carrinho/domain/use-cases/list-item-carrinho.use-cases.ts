import { Inject, Injectable } from '@nestjs/common';
import { ItemCarrinhoRepository } from '../repository/item-carrinho.repository';
import { CreateItemCarrinhoDto } from '../dto/create-item-carrinho.dto';
import { IFindById } from '../../../shared/interfaces/find-by-id.interface';
import { PRODUCTS_FIND_BY_ID_PROVIDER } from '../../../shared/constants/injection-tokens';
import { Product } from '../../../products/domain/entities/product.entity';

@Injectable()
export class ListItemCarrinho {
  constructor(
    private readonly itemCarrinhoRepository: ItemCarrinhoRepository,
    @Inject(PRODUCTS_FIND_BY_ID_PROVIDER)
    private readonly products: IFindById<Product>,
  ) {}

  async listItemCarrinho() {
    return this.itemCarrinhoRepository.listItemCarrinho();
  }
}
