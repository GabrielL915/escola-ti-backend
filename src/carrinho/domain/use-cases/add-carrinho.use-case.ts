import { Injectable } from '@nestjs/common';
import { CarrinhoRepository } from '../repository/carrinho.repository';

@Injectable()
export class AddCarrinhoUseCase {
  constructor(private readonly carrinhoRepository: CarrinhoRepository) {}

  async addCarrinho(id: string) {
    return await this.carrinhoRepository.addCarrinho(id);
  }
}