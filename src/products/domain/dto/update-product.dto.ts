import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  nome?: string;
  descricao?: string;
  valor?: number;
  status?: boolean;
 
}
