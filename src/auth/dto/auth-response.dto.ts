import { Exclude } from 'class-transformer';
import { SingUpDto } from './singup.dto';

export class AuthResponseDto implements SingUpDto {
  nome: string;
  sobrenome: string;
  @Exclude()
  CPF: string;
  @Exclude()
  CNPJ: string;
  email: string;
  telefone: string;
  data_de_nascimento: string;
  @Exclude()
  senha: string;
  mochila: boolean;
  data_de_cadastro: string;
}
