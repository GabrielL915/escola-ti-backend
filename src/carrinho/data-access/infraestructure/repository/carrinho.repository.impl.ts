import { CreateCarrinhoDto } from 'src/carrinho/domain/dto/create-carrinho.dto';
import { Carrinho } from 'src/carrinho/domain/entities/carrinho.entity';
import { CarrinhoRepository } from 'src/carrinho/domain/repository/carrinho.repository';

export class CarrinhoRepositoryImpl implements CarrinhoRepository {
  async create(input: CreateCarrinhoDto): Promise<Carrinho> {
    return {
      id: '1',
      id_entregador: '1',
      id_item_carrinho: '1',
      valor: 1,
      status: true,
    };
  }
  async addCarrinho(id: string): Promise<Carrinho> {
    throw new Error('Method not implemented.');
  }
/*   finishCompra(input: any) {
    throw new Error('Method not implemented.');
  } */
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
