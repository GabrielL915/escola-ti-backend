import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsNotEmpty,
  IsISO8601,
  IsInt,
  Length,
  Max,
  IsBoolean,
} from 'class-validator';

export class CreateCampaignDto {
  @ApiProperty({
    description: 'Nome identificador da campanha',
    example: 'Campanha Massas Março',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Length(0, 30)
  tipo: string;

  @ApiProperty({
    description: 'Lista de dias em que a campanha será ativa',
    example: ['Segunda-feira', 'Terça-feira', 'Quarta-feira'],
    type: String,
  })
  @IsArray()
  @IsNotEmpty()
  dias: Array<string>;

  @ApiProperty({
    description: 'Horário inicial em que a campanha começa todos os dias',
    example: '2023-09-18T09:00:00Z',
    type: String,
  })
  @IsString()
  @IsISO8601()
  horario_inicial: string;

  @ApiProperty({
    description: 'Horário final em que a campanha termina todos os dias',
    example: '2023-09-18T17:00:00Z',
    type: String,
  })
  @IsString()
  @IsISO8601()
  horario_final: string;

  @ApiProperty({
    description:
      'Número máximo de corridas que o entregador pode ignorar durante a campanha',
    example: 3,
    type: Number,
  })
  @IsInt()
  @IsNotEmpty()
  @Max(9999)
  limite_corridas_ignoradas: number;

  @ApiProperty({
    description:
      'Número máximo de corridas que o entregador pode recusar durante a campanha',
    example: 2,
    type: Number,
  })
  @IsInt()
  @IsNotEmpty()
  @Max(9999)
  limite_corridas_recusadas: number;

  @ApiProperty({
    description:
      'Tempo (em minutos) que o entregador tem de tolerância para atrasos',
    example: '2023-09-18T09:15:00Z',
    type: String,
  })
  @IsString()
  @IsISO8601()
  tempo_de_tolerancia: string;

  @ApiProperty({
    description: 'Breve descrição sobre o objetivo e benefícios da campanha',
    example:
      'Participe da campanha de massas de Março e obtenha bônus por entrega!',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Length(0, 500)
  descricao: string;
}