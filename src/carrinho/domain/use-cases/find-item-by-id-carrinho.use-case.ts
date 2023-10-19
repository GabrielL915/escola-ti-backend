import { Inject, Injectable } from '@nestjs/common';
import { CarrinhoRepository } from '../repository/carrinho.repository';
import { IFindAllById } from 'src/shared/interfaces/find-all-by-id.interface';
import { IFindById } from '../../../shared/interfaces/find-by-id.interface';
import {
  ITEM_CARRINHO_FIND_ALL_BY_ID_PROVIDER,
  PRODUCTS_FIND_BY_ID_PROVIDER,
} from '../../../shared/constants/injection-tokens';
import { ItemCarrinho } from 'src/item-carrinho/domain/entities/item-carrinho.entity';
@Injectable()
export class FindItensCarrinhoUseCase {
  constructor(
    private readonly carrinhoRepository: CarrinhoRepository,
    @Inject(ITEM_CARRINHO_FIND_ALL_BY_ID_PROVIDER)
    private readonly findAllById: IFindAllById<ItemCarrinho>,
    @Inject(PRODUCTS_FIND_BY_ID_PROVIDER)
    private readonly products: IFindById<any>,
  ) {}

  async findItensCarrinho(id_motoboy: string) {
    const carrinho = await this.carrinhoRepository.findById(id_motoboy);
    const itensCarrinho = await this.findAllById.findAllById(carrinho.id);
    const itens = [];

    for (let i = 0; i < itensCarrinho.length; i++) {
      const product = await this.products.findById(itensCarrinho[i].id_produto);
      itens.push({
        id: itensCarrinho[i].id,
        id_produto: itensCarrinho[i].id_produto,
        nome: product.nome,
        quantidade: itensCarrinho[i].quantidade,
        valor: itensCarrinho[i].valor,
        url: product.imagem.url,
      });
    }
    return { valor_total: carrinho.valor_total, itens };
  }
}
