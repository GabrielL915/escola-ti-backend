import { CreateCarrinhoDto } from 'src/carrinho/domain/dto/create-carrinho.dto';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { Carrinho } from 'src/carrinho/domain/entities/carrinho.entity';
import { CarrinhoRepository } from 'src/carrinho/domain/repository/carrinho.repository';
import { createdAt } from '../../../../shared/utils/created-at';
export class CarrinhoRepositoryImpl implements CarrinhoRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async create(id_motoboy: string): Promise<Carrinho> {
    console.log(createdAt);
    console.log(id_motoboy);
    const newCarrinho = {
      id_entregador: id_motoboy,
      valor: 0,
      data_de_compra: createdAt,
    };

    const [carrinho] = await this.knex('carrinho')
      .insert(newCarrinho)
      .returning('*');
    return carrinho;
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
