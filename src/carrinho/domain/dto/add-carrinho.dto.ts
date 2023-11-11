import { IsNumber } from 'class-validator';

export class AddCarrinhoDto {
  @IsNumber()
  quantidade: number;
}
