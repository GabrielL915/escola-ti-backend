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
  Put,
} from '@nestjs/common';
import { CreateCarrinhoDto } from '../domain/dto/create-carrinho.dto';
import { UpdateCarrinhoDto } from '../domain/dto/update-carrinho.dto';
import { AddCarrinhoDto } from '../domain/dto/add-carrinho.dto';
import { CreateCarrinhoUseCase } from '../domain/use-cases/create-carrinho.use-case';
import { AddCarrinhoUseCase } from '../domain/use-cases/add-carrinho.use-case';
import { FindItensCarrinhoUseCase } from '../domain/use-cases/find-item-by-id-carrinho.use-case';
import { FinishCompraCarrinhoUseCase } from '../domain/use-cases/finish-compra-carrinho.use-case';
import { DeleteCarrinhoUseCase } from '../domain/use-cases/delete-carrinho.use-case';
import { AccessTokenGuard } from '../../auth/guards/access-token.guard';

@Controller('carrinho')
export class CarrinhoController {
  constructor(
    private readonly createCarrinhoUseCase: CreateCarrinhoUseCase,
    private readonly addCarrinhoUseCase: AddCarrinhoUseCase,
    private readonly findItensCarrinhoUseCase: FindItensCarrinhoUseCase,
    private readonly finishCompraCarrinhoUseCase: FinishCompraCarrinhoUseCase,
    private readonly deleteCarrrinhoUseCase: DeleteCarrinhoUseCase,
  ) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  create(@Req() req: Request) {
    const id_motoboy = req['user'].sub;
    return this.createCarrinhoUseCase.create(id_motoboy);
  }

  @Get('itens')
  @UseGuards(AccessTokenGuard)
  findItensCarrinho(@Req() req: Request) {
    const id_motoboy = req['user'].sub;
    return this.findItensCarrinhoUseCase.findById(id_motoboy);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteCarrrinhoUseCase.delete(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('add/:id')
  add(
    @Param('id') id_produto: string,
    @Req() req: Request,
    @Body() input: AddCarrinhoDto,
  ) {
    const id_motoboy = req['user'].sub;
    return this.addCarrinhoUseCase.addCarrinho(id_produto, id_motoboy, input);
  }

  @Put('finish/:id')
  finish(@Param('id') id: string) {
    return this.finishCompraCarrinhoUseCase.finishCompra(id);
  }
}
