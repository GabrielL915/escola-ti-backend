import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateMotoboyDto } from './create-motoboy.dto';
import { ApiProperty } from '@nestjs/swagger';
import { SmsDto } from 'src/auth/domain/dto/sms.dto';
export class UpdateMotoboyResponseDto extends PartialType(CreateMotoboyDto) {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty({
    description: 'Nome do entregador',
    minLength: 2,
    maxLength: 100,
    example: 'João',
    type: String,
    required: true,
  })
  nome?: string;

  @IsString()
  @ApiProperty({
    description: 'Sobrenome do entregador',
    example: 'Almeida',
    type: String,
    required: true,
  })
  sobrenome?: string;

  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'Email do entregador',
    example: 'joao.almeida@example.com',
    type: String,
    required: true,
  })
  email?: string;

  @IsString()
  @MaxLength(15)
  @MinLength(15)
  @ApiProperty({
    description: 'Telefone do entregador',
    example: '(44) 99999-9999',
    type: String,
    required: true,
  })
  telefone?: SmsDto['telefone'];

  @ApiProperty({
    description: 'Data de nascimento do entregador',
    example: '01/01/1990',
    type: String,
    required: true,
  })
  data_de_nascimento?: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({
    description: 'Senha do entregador',
    minLength: 8,
    example: 'senhaSegura123',
    type: String,
    required: true,
  })
  senha?: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: 'Se o entregador possui mochila',
    example: true,
    type: Boolean,
    required: false,
  })
  mochila?: boolean;

  aiqcoins?: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Id da cidade do entregador',
    example: '00000000-0000-0000-0000-000000000000',
    type: String,
    required: true,
  })
  id_endereco_de_servico?: string;
}
