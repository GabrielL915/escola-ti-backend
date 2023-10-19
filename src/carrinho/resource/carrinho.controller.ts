import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateCarrinhoDto } from '../domain/dto/create-carrinho.dto';
import { UpdateCarrinhoDto } from '../domain/dto/update-carrinho.dto';
import { AddCarrinhoDto } from '../domain/dto/add-carrinho.dto';
import { CreateCarrinhoUseCase } from '../domain/use-cases/create-carrinho.use-case';
import { AddCarrinhoUseCase } from '../domain/use-cases/add-carrinho.use-case';
import { FinishCompraCarrinhoUseCase } from '../domain/use-cases/finish-compra-carrinho.use-case';
import { DeleteCarrinhoUseCase } from '../domain/use-cases/delete-carrinho.use-case';
import { AccessTokenGuard } from '../../auth/guards/access-token.guard';

@Controller('carrinho')
export class CarrinhoController {
  constructor(
    private readonly createCarrinhoUseCase: CreateCarrinhoUseCase,
    private readonly addCarrinhoUseCase: AddCarrinhoUseCase,
    private readonly finishCompraCarrinhoUseCase: FinishCompraCarrinhoUseCase,
    private readonly deleteCarrrinhoUseCase: DeleteCarrinhoUseCase,
  ) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  create(@Req() req: Request) {
    const id_motoboy = req['user'].sub;
    return this.createCarrinhoUseCase.create(id_motoboy);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteCarrrinhoUseCase.delete(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('add/:id')
  add(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() input: AddCarrinhoDto,
  ) {
    const id_motoboy = req['user'].sub;
    return this.addCarrinhoUseCase.addCarrinho(id, id_motoboy, input);
  }

  @Patch('finish/:id')
  finish(@Param('id') id: string) {
    return this.finishCompraCarrinhoUseCase.finishCompra(id);
  }
}
