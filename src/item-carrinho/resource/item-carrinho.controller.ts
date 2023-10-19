import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateItemCarrinhoDto } from '../domain/dto/create-item-carrinho.dto';
import { UpdateItemCarrinhoDto } from '../domain/dto/update-item-carrinho.dto';
import { CreateItemCarrinhoUseCase } from '../domain/use-cases/create-item-carrinho.use-case';

@Controller('item-carrinho')
export class ItemCarrinhoController {
  constructor(private readonly createItemCarrinhoUseCase: CreateItemCarrinhoUseCase) {}

  @Post()
  create(@Body() createItemCarrinhoDto: CreateItemCarrinhoDto) {
    return this.createItemCarrinhoUseCase.create(createItemCarrinhoDto);
  }

/*   @Get()
  findAll() {
    return this.itemCarrinhoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemCarrinhoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemCarrinhoDto: UpdateItemCarrinhoDto) {
    return this.itemCarrinhoService.update(+id, updateItemCarrinhoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemCarrinhoService.remove(+id);
  } */
}
