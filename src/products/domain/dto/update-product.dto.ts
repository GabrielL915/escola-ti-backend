import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  nome: string;
  valor: number;
  escopo: number;
  imagem: string; // Imagem
}
