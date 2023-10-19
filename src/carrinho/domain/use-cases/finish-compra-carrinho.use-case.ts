import { Inject, Injectable } from '@nestjs/common';
import { CarrinhoRepository } from '../repository/carrinho.repository';
import { IFindById } from '../../../shared/interfaces/find-by-id.interface';
import { IUpdate } from '../../../shared/interfaces/update.interface';
import { Stock } from '../../../stock/domain/entities/stock.entity';
import { UpdateStockDto } from '../../../stock/domain/dto/update-stock.dto';
import {
  CARRINHO_FIND_ITENS_BY_ID_PROVIDER,
  STOCK_UPDATE_PROVIDER,
  STOCK_FIND_BY_ID_PROVIDER,
} from 'src/shared/constants/injection-tokens';
import { FindItensCarrinhoResponseDto } from '../dto/find-itens-carrinho-response.dto';

@Injectable()
export class FinishCompraCarrinhoUseCase {
  constructor(
    private readonly carrinhoRepository: CarrinhoRepository,
    @Inject(CARRINHO_FIND_ITENS_BY_ID_PROVIDER)
    private readonly findItensById: IFindById<FindItensCarrinhoResponseDto>,
    @Inject(STOCK_UPDATE_PROVIDER)
    private readonly updateStock: IUpdate<UpdateStockDto, Stock>,
    @Inject(STOCK_FIND_BY_ID_PROVIDER)
    private readonly findByIdStock: IFindById<Stock>,
  ) {}

  async finishCompra(id: string) {
    const carrinho = await this.carrinhoRepository.findById(id);
    const itensCarrinho = await this.findItensById.findById(carrinho.id_entregador);

    for (const item of itensCarrinho.itens) {
        const currentStockItem = await this.findByIdStock.findById(item.id_produto);
        const newStockQuantity = currentStockItem.quantidade - item.quantidade;
        if (newStockQuantity < 0) {
            throw new Error('Quantidade insuficiente em estoque para o produto ' + item.id_produto);
        }
        await this.updateStock.update(item.id_produto, {
            quantidade: newStockQuantity,
        });
    }

    const itens = itensCarrinho.itens.map((item) => ({
      id_produto: item.id_produto,
      quantidade: item.quantidade,
      valor: item.valor,
    }));

    const compra = {
      id_carrinho: carrinho.id,
      id_entregador: carrinho.id_entregador,
      valor_total: carrinho.valor_total,
      itens,
    };

    return compra;
  }
}
