import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AddCarrinhoDto } from '../domain/dto/add-carrinho.dto';
import { AddCarrinhoUseCase } from '../domain/service/add-carrinho.use-case';
import { FindItensCarrinhoUseCase } from '../domain/service/find-item-by-id-carrinho.use-case';
import { FinishCompraCarrinhoUseCase } from '../domain/service/finish-compra-carrinho.use-case';
import { DeleteCarrinhoUseCase } from '../domain/service/delete-carrinho.use-case';
import { DeleteItemCarrinhoUseCase } from '../domain/service/delete-item-carrinho.use-case';
import { AccessTokenGuard } from '../../auth/guards/access-token.guard';

@Controller('carrinho')
export class CarrinhoController {
  constructor(
    private readonly addCarrinhoUseCase: AddCarrinhoUseCase,
    private readonly findItensCarrinhoUseCase: FindItensCarrinhoUseCase,
    private readonly finishCompraCarrinhoUseCase: FinishCompraCarrinhoUseCase,
    private readonly deleteCarrrinhoUseCase: DeleteCarrinhoUseCase,
    private readonly deleteItemCarrinhoUseCase: DeleteItemCarrinhoUseCase,
  ) {}

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

  @Delete('itens/:id_itens')
  @UseGuards(AccessTokenGuard)
  removeItem(
    @Req() req: Request,
    @Param('id_itens') id_itens: string,
  ) {
    const id_motoboy = req['user'].sub;
    return this.deleteItemCarrinhoUseCase.deleteItensCarrinho(
      id_itens,
      id_motoboy,
    );
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

  @Patch('finish/:id')
  finish(@Param('id') id: string) {
    return this.finishCompraCarrinhoUseCase.finishCompra(id);
  }
}
