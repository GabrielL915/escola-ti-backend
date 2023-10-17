import { Injectable } from '@nestjs/common';
import { Carrinho } from '../entities/carrinho.entity';
import { CreateCarrinhoDto } from '../dto/create-carrinho.dto';
import { CarrinhoRepository } from '../repository/carrinho.repository';

@Injectable()
export class CreateCarrinhoUseCase {
  constructor(private carrinhoRepository: CarrinhoRepository) {}

  async create(input: CreateCarrinhoDto): Promise<Carrinho> {
    console.log(input);
    return await this.carrinhoRepository.create(input);
  }
}
