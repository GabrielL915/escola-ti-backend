import { Injectable } from '@nestjs/common';
import { Carrinho } from '../entities/carrinho.entity';
import { CreateCarrinhoDto } from '../dto/create-carrinho.dto';
import { CarrinhoRepository } from '../repository/carrinho.repository';

@Injectable()
export class CreateCarrinhoUseCase {
  constructor(private carrinhoRepository: CarrinhoRepository) {}

  async create(id_motoboy: string): Promise<Carrinho> {
    return await this.carrinhoRepository.create(id_motoboy);
  }
}
