import { Exclude } from 'class-transformer';
import { RegisterDto } from './register.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';

export class AuthResponseDto extends RegisterDto {
  @ApiProperty({
    description: 'Nome do entregador',
    example: 'João',
    type: String,
    required: true,
  })
  nome: string;
  @ApiProperty({
    description: 'Sobrenome do entregador',
    example: 'Silva',
    type: String,
    required: true,
  })
  sobrenome: string;
  @Exclude()
  CPF: string;
  @Exclude()
  CNPJ: string;
  @ApiProperty({
    description: 'Email do entregador',
    example: '',
    type: String,
    required: true,
  })
  email: string;
  @ApiProperty({
    description: 'Telefone do entregador',
    example: '',
    type: String,
    required: true,
  })
  telefone: string;
  @ApiProperty({
    description: 'Data de nascimento do entregador',
    example: '1999-01-01',
    type: String,
    required: true,
  })
  data_de_nascimento: string;
  @Exclude()
  senha: string;
  @ApiProperty({
    description: 'Mochila do entregador',
    example: true,
    type: Boolean,
    required: true,
  })
  mochila: boolean;
  @ApiProperty({
    description: 'Data de cadastro do entregador',
    example: '2021-01-01',
    type: String,
    required: true,
  })
  data_de_cadastro: string;

  Id_endereco_de_servico : UUID
}
