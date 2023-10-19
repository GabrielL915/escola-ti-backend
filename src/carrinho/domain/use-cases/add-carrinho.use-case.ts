import { Inject, Injectable } from '@nestjs/common';
import { CarrinhoRepository } from '../repository/carrinho.repository';
import { AddCarrinhoDto } from '../dto/add-carrinho.dto';
import { UpdateCarrinhoDto } from '../dto/update-carrinho.dto';
import { ICreate } from '../../../shared/interfaces/create.interface';
import { IFindById } from '../../../shared/interfaces/find-by-id.interface';
import { IFindAllById } from 'src/shared/interfaces/find-all-by-id.interface';
import {
  ITEM_CARRINHO_CREATE_PROVIDER,
  ITEM_CARRINHO_FIND_ALL_BY_ID_PROVIDER,
  PRODUCTS_FIND_BY_ID_PROVIDER,
} from '../../../shared/constants/injection-tokens';
import { CreateItemCarrinhoDto } from 'src/item-carrinho/domain/dto/create-item-carrinho.dto';
import { ItemCarrinho } from 'src/item-carrinho/domain/entities/item-carrinho.entity';
@Injectable()
export class AddCarrinhoUseCase {
  constructor(
    private readonly carrinhoRepository: CarrinhoRepository,
    @Inject(PRODUCTS_FIND_BY_ID_PROVIDER)
    private readonly products: IFindById<any>,
    @Inject(ITEM_CARRINHO_CREATE_PROVIDER)
    private readonly createItemCarrinho: ICreate<
      CreateItemCarrinhoDto,
      ItemCarrinho
    >,
    @Inject(ITEM_CARRINHO_FIND_ALL_BY_ID_PROVIDER)
    private readonly findAllById: IFindAllById<ItemCarrinho>,
  ) {}

  async addCarrinho(
    id_product: string,
    id_motoboy: string,
    input: AddCarrinhoDto,
  ) {
    const product = await this.products.findById(id_product);

    if (product.stock.quantidade < input.quantidade) {
      throw new Error('Quantidade indisponível');
    }

    const idCarrinho = await this.carrinhoRepository.findById(id_motoboy);

    await this.createItemCarrinho.create({
      id_produto: id_product,
      id_carrinho: idCarrinho.id,
      quantidade: input.quantidade,
      valor: product.valor * input.quantidade,
    });

    const valorTotal = await this.calculateTotalForCarrinho(idCarrinho.id);

    const updateInput: UpdateCarrinhoDto = {
      valor_total: valorTotal,
    };

    return await this.carrinhoRepository.addCarrinho(
      idCarrinho.id,
      updateInput,
    );
  }

  private async calculateTotalForCarrinho(idCarrinho: string): Promise<number> {
    const itensCarrinho = await this.findAllById.findAllById(idCarrinho);
    return itensCarrinho.reduce((acc, item) => acc + item.valor, 0);
  }
}
