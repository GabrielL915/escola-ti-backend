import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nome da cidade',
    example: 'São Paulo',
    type: String,
    required: true,
  })
  city: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'UF da cidade',
    example: 'SP',
    type: String,
    required: true,
  })
  uf: string;
}
