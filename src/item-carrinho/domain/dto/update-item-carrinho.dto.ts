import { PartialType } from '@nestjs/swagger';
import { CreateItemCarrinhoDto } from './create-item-carrinho.dto';

export class UpdateItemCarrinhoDto extends PartialType(CreateItemCarrinhoDto) {}
