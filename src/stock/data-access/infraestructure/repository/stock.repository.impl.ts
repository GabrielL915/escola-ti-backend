import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { CreateStockDto } from '../../../domain/dto/create-stock.dto';
import { UpdateStockDto } from '../../../domain/dto/update-stock.dto';
import { Stock } from '../../../domain/entities/stock.entity';
import { StockRepository } from '../../../domain/repository/stock.repository';
import { InternalServerErrorException } from '@nestjs/common';

export class StockRepositoryImpl implements StockRepository {
  constructor(@InjectKnex() private knex: Knex) {}

  async create(input: CreateStockDto): Promise<Stock> {
    try {
      const [stock] = await this.knex('estoque').insert(input).returning('*');
      return stock;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao criar estoque no banco',
        error,
      );
    }
  }

  async findAll(): Promise<Stock[]> {
    try {
      return await this.knex('estoque').select('*');
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar todos estoque no banco',
        error,
      );
    }
  }

  async findById(id: string): Promise<Stock> {
    try {
      const [stock] = await this.knex('estoque')
        .select('*')
        .where({ id_produto: id });
      return stock;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar estoque no banco',
        error,
      );
    }
  }

  async update(id: string, input: UpdateStockDto): Promise<Stock> {
    try {
      const [stock] = await this.knex('estoque')
        .update({
          quantidade: input.quantidade,
        })
        .where({ id_produto: id })
        .returning('*');
      return stock;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar estoque no banco',
        error,
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.knex('estoque').where({ id_produto: id }).del();
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao deletar estoque no banco',
        error,
      );
    }
  }
}
