import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { CreateProductDto } from 'src/products/domain/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/domain/dto/update-product.dto';
import { Product } from '../../../domain/entities/product.entity';
import { ProductRepository } from 'src/products/domain/repository/products.repository';

export class ProductRepositoryImpl implements ProductRepository {
  constructor(@InjectKnex() private knex: Knex) {}

  async create(input: CreateProductDto): Promise<Product> {
    const [product] = await this.knex('produto')
      .insert({
        ...input,
        status: true,
      })
      .returning('*');
    return product;
  }
  async findAll(): Promise<Product[]> {
    return Promise.resolve(undefined);
  }
  async findById(id: string): Promise<Product> {
    return Promise.resolve(undefined);
  }
  async update(id: string, input: UpdateProductDto): Promise<Product> {
    return Promise.resolve(undefined);
  }
  async delete(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}
