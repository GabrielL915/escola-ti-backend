import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsNumber,
  Min,
} from 'class-validator';

import { CreateRegisteredDto } from './create-registered.dto';

export class UpdateRegisteredDto extends CreateRegisteredDto {
  @ApiProperty({
    description: 'ID do entregador',
    example: '1234-5678',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  id_entregador: string;

  @ApiProperty({
    description: 'ID da campanha',
    example: 'abcd-efgh',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  id_campanha: string;

  @ApiProperty({
    description: 'Data de inscrição do entregador',
    example: '2023-09-21',
    type: String,
  })
  @IsDate()
  @IsNotEmpty()
  data_inscricao: string;

  @ApiProperty({
    description: 'Número de corridas ignoradas pelo entregador',
    example: 5,
    type: Number,
  })
  @IsNumber()
  @Min(0)
  corridas_ignoradas: number;

  @ApiProperty({
    description: 'Número de corridas recusadas pelo entregador',
    example: 3,
    type: Number,
  })
  @IsNumber()
  @Min(0)
  corridas_recusadas: number;
}
