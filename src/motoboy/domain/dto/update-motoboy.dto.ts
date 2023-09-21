import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateMotoboyDto  {
  @IsNotEmpty()
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
  nome: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Sobrenome do entregador',
    example: 'Silva',
    type: String,
    required: true,
  })
  sobrenome: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'Email do entregador',
    example: 'email@gmail.com',
    type: String,
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(13)
  @MinLength(13)
  @ApiProperty({
    description: 'Telefone do entregador',
    example: '(00) 00000-0000',
    type: String,
    required: true,
  })
  telefone: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Data de nascimento do entregador',
    example: '1999/01/01',
    type: String,
    required: true,
  })
  data_de_nascimento: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({
    description: 'Senha do entregador',
    minLength: 8,
    example: '12345678',
    type: String,
    required: true,
  })
  senha: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: 'Se o entregador possui mochila',
    example: true,
    type: Boolean,
    required: true,
  })
  mochila: boolean;
}
