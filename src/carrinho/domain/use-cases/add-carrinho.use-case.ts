import { Inject, Injectable } from '@nestjs/common';
import { CarrinhoRepository } from '../repository/carrinho.repository';
import { IFindById } from '../../../shared/interfaces/find-by-id.interface';
import { PRODUCTS_FIND_BY_ID_PROVIDER } from '../../../shared/constants/injection-tokens';
import { Product } from '../../../products/domain/entities/product.entity';
import { AddCarrinhoDto } from '../dto/add-carrinho.dto';
import { UpdateCarrinhoDto } from '../dto/update-carrinho.dto';
import { ICreate } from '../../../shared/interfaces/create.interface';
import { Carrinho } from '../entities/carrinho.entity';
import { ITEM_CARRINHO_CREATE_PROVIDER } from '../../../shared/constants/injection-tokens';
import { CreateItemCarrinhoDto } from 'src/item-carrinho/domain/dto/create-item-carrinho.dto';
import { ItemCarrinho } from 'src/item-carrinho/domain/entities/item-carrinho.entity';
@Injectable()
export class AddCarrinhoUseCase {
  constructor(
    private readonly carrinhoRepository: CarrinhoRepository,
    @Inject(PRODUCTS_FIND_BY_ID_PROVIDER)
    private readonly products: IFindById<any>,
    @Inject(ITEM_CARRINHO_CREATE_PROVIDER)
    private readonly itemCarrinho: ICreate<CreateItemCarrinhoDto, ItemCarrinho>,
  ) {}

  async addCarrinho(
    id_product: string,
    id_motoboy: string,
    input: AddCarrinhoDto,
  ) {
    const product = await this.products.findById(id_product);
    console.log('Produto recuperado:', product);
    console.log('Quantidade em stock:', product.stock.quantidade);
    console.log('Quantidade solicitada:', input.quantidade);

    if (product.stock.quantidade < input.quantidade) {
      console.error('Quantidade indisponível');
    } else {
      const idCarrinho = await this.carrinhoRepository.findById(id_motoboy);
      console.log('Carrinho recuperado:', idCarrinho.id);
      
      const itemCarrinho = await this.itemCarrinho.create({
        id_produto: id_product,
        id_carrinho: idCarrinho.id,
        quantidade: input.quantidade,
        valor: product.valor * input.quantidade,
      });
      console.log('Item carrinho criado:', itemCarrinho);
      
      const updateInput: UpdateCarrinhoDto = {
        valor_total: itemCarrinho.valor,
      };
      return await this.carrinhoRepository.addCarrinho(
        idCarrinho.id,
        updateInput,
      );
    }
  }
}
