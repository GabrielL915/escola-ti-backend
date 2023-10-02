import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
} from 'class-validator';
import { CreateMetaDto } from './create-meta.dto';

export class UpdateMetaDto extends PartialType(CreateMetaDto) {

  @ApiProperty({
    description: 'Valor atingido pelo entregador',
    example: '25%',
    type: String,
  })
  @IsNotEmpty()
  valor_atingido: number;
}
