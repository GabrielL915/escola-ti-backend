import { Controller, Post, Body } from '@nestjs/common';
import { CreateItemCarrinhoDto } from '../domain/dto/create-item-carrinho.dto';
import { CreateItemCarrinhoUseCase } from '../domain/use-cases/create-item-carrinho.use-case';

@Controller('item-carrinho')
export class ItemCarrinhoController {
  constructor(
    private readonly createItemCarrinhoUseCase: CreateItemCarrinhoUseCase,
  ) {}

  @Post()
  create(@Body() createItemCarrinhoDto: CreateItemCarrinhoDto) {
    return this.createItemCarrinhoUseCase.create(createItemCarrinhoDto);
  }
}
