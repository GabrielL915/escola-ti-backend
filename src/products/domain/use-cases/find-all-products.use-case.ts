import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/products.repository';

@Injectable()
export class FindAllProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}
  async findAll() {
    const products = await this.productRepository.findAll();
    console.log(products);
    return products;
  }
}
