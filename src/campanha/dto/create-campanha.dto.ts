import { ApiProperty } from '@nestjs/swagger';
export class CreateCampanhaDto {
  id: number;

  @ApiProperty({
    description: 'Nome da campanha',
    example: 'Semana das Massas',
    type: String,
  })
  tipo: string;

  @ApiProperty({
    description: 'Duração da campanha',
    example: '7 dias',
    type: String,
  })
  dias: Array<string>;

  @ApiProperty({
    description: 'Horário de início da campanha',
    example: '08:00',
    type: String,
  })
  horario: string;

  @ApiProperty({
    description: 'Limite de corridas ignoradas pelo entregador',
    example: 10,
    type: Number,
  })
  limite_corridas_ignoradas: number;

  @ApiProperty({
    description: 'Limite de corridas recusadas pelo entregador',
    example: 10,
    type: Number,
  })
  limite_corridas_recusadas: number;

  @ApiProperty({
    description: 'Tempo de tolerância para o entregador',
    example: 10,
    type: Number,
  })
  tempo_de_tolerancia: number;

  @ApiProperty({
    description: 'Periodo da campanha',
    example: 'Tarde',
    type: String,
  })
  periodo: string;

  @ApiProperty({
    description: 'Descrição da campanha',
    example: 'Faça entregas de massas e ganhe mais',
    type: String,
  })
  descricao: string;

  @ApiProperty({
    description: 'Camapanha ativa ou não',
    example: true,
    type: String,
  })
  ativa: boolean;
}
