import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsNumber()
  @IsOptional()
  @Transform((value) => Number(value))
  valor?: number;

  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @IsNumber()
  @IsOptional()
  @Transform((value) => Number(value))
  quantidade?: number;
}
