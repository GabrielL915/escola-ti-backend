import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { CreateProductDto } from 'src/products/domain/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/domain/dto/update-product.dto';
import { Product } from '../../../domain/entities/product.entity';
import { ProductRepository } from 'src/products/domain/repository/products.repository';
import { InternalServerErrorException } from '@nestjs/common';

export class ProductRepositoryImpl implements ProductRepository {
  constructor(@InjectKnex() private knex: Knex) {}

  async create(input: CreateProductDto): Promise<Product> {
    try {
      const [product] = await this.knex('produto').insert(input).returning('*');
      return product;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao criar produto no banco',
        error,
      );
    }
  }
  async findAll(): Promise<Product[]> {
    try {
      return this.knex('produto').select('*');
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar produtos no banco',
        error,
      );
    }
  }
  async findById(id: string): Promise<Product> {
    try {
      const [product] = await this.knex('produto').select('*').where({ id });
      return product;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar produto no banco',
        error,
      );
    }
  }
  async update(id: string, input: UpdateProductDto): Promise<Product> {
    try {
      const [product] = await this.knex('produto')
        .update({
          nome: input.nome,
          descricao: input.descricao,
          valor: input.valor,
          status: input.status,
        })
        .where({ id })
        .returning('*');
      return product;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar produto no banco',
        error,
      );
    }
  }
  async delete(id: string): Promise<void> {
    try {
      await this.knex('produto').where({ id }).del();
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao deletar produto no banco',
        error,
      );
    }
  }
}
