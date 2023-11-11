import { PartialType } from '@nestjs/swagger';

export class UpdateCarrinhoDto {
  valor_total?: number;
  status?: boolean;
}
