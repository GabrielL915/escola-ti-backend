/* import { Injectable } from '@nestjs/common';
import { Carrinho } from '../entities/carrinho.entity';
import { CarrinhoRepository } from './../repository/carrinho.repository';

@Injectable()
export class FindByIdCarrinhoUseCase {
  constructor(private carrinhoRepository: CarrinhoRepository) {}

  async findById(id: string): Promise<Carrinho> {
    return await this.carrinhoRepository.findById(id);
  }
} */