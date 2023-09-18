import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsNotEmpty,
  IsISO8601,
  IsInt,
  Length,
  Max,
} from 'class-validator';

export class CreateCampanhaDto {
  @IsString()
  @IsNotEmpty()
  @Length(0, 30)
  tipo: string;

  @IsArray()
  @IsNotEmpty()
  dias: Array<string>;

  @IsString()
  @IsISO8601()
  horario_inicial: string;

  @IsString()
  @IsISO8601()
  horario_final: string;

  @IsInt()
  @IsNotEmpty()
  @Max(9999)
  limite_corridas_ignoradas: number;

  @IsInt()
  @IsNotEmpty()
  @Max(9999)
  limite_corridas_recusadas: number;

  @IsString()
  @IsISO8601()
  tempo_de_tolerancia: string;

  @IsString()
  @IsNotEmpty()
  @Length(0, 500)
  descricao: string;

  @IsString()
  @IsNotEmpty()
  ativa: string;
}
