import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCarrinhoDto } from '../domain/dto/create-carrinho.dto';
import { UpdateCarrinhoDto } from '../domain/dto/update-carrinho.dto';
import { CreateCarrinhoUseCase } from '../domain/use-cases/create-carrinho.use-case';
import { AddCarrinhoUseCase } from '../domain/use-cases/add-carrinho.use-case';
import { FinishCompraCarrinhoUseCase } from '../domain/use-cases/finish-compra-carrinho.use-case';
import { DeleteCarrinhoUseCase } from '../domain/use-cases/delete-carrinho.use-case';

@Controller('carrinho')
export class CarrinhoController {
  constructor(
    private readonly createCarrinhoUseCase: CreateCarrinhoUseCase,
    private readonly addCarrinhoUseCase: AddCarrinhoUseCase,
    private readonly finishCompraCarrinhoUseCase: FinishCompraCarrinhoUseCase,
    private readonly deleteCarrrinhoUseCase: DeleteCarrinhoUseCase,
  ) {}

  @Post()
  create(@Body() input: CreateCarrinhoDto) {
    return this.createCarrinhoUseCase.create(input);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteCarrrinhoUseCase.delete(id);
  }

  @Patch('add/:id')
  add(@Param('id') id: string) {
    return this.addCarrinhoUseCase.addCarrinho(id);
  }

  @Patch('finish/:id')
  finish(@Param('id') id: string) {
    return this.finishCompraCarrinhoUseCase.finishCompra(id);
  }


}
