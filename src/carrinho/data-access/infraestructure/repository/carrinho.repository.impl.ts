import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { Carrinho } from 'src/carrinho/domain/entities/carrinho.entity';
import { CarrinhoRepository } from 'src/carrinho/domain/repository/carrinho.repository';
import { createdAt } from '../../../../shared/utils/created-at';
import { UpdateCarrinhoDto } from 'src/carrinho/domain/dto/update-carrinho.dto';
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
  async addCarrinho(id: string, input: UpdateCarrinhoDto): Promise<Carrinho> {
    const [carrinho] = await this.knex('carrinho')
      .update(input)
      .where({ id })
      .returning('*');
    return carrinho;
  }
  /*   finishCompra(input: any) {
    throw new Error('Method not implemented.');
  } */
  async findByIdMotoboy(id: string): Promise<Carrinho> {
    const [cart] = await this.knex('carrinho')
      .select('*')
      .where({ id_entregador: id, status: true });
    return cart;
  }
  async findById(id: string): Promise<Carrinho> {
    const [cart] = await this.knex('carrinho').select('*').where({ id });
    return cart;
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
