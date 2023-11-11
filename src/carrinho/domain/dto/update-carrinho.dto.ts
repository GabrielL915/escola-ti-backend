import { IsBoolean, IsNumber } from 'class-validator';

export class UpdateCarrinhoDto {
  @IsNumber()
  valor_total?: number;
  @IsBoolean()
  status?: boolean;
}
