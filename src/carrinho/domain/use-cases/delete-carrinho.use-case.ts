import { Injectable } from '@nestjs/common';
import { CarrinhoRepository } from '../repository/carrinho.repository';

@Injectable()
export class DeleteCarrinhoUseCase {
  constructor(private readonly carrinhoRepository: CarrinhoRepository) {}

  async delete(id: string) {
    return await this.carrinhoRepository.delete(id);
  }
}
