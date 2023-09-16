import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { hashPassword } from '../../util/hash-password';
import {
  removePhoneMask,
  removeCpfMask,
  removeCnpjMask,
} from '../../util/remove-mask';
import { AuthResponseDto } from '../dto/auth-response.dto';

@Injectable()
export class RegisterUseCase {
  constructor(@InjectModel() private knex: Knex) {}

  async register(createCadastroDto: RegisterDto): Promise<AuthResponseDto> {
    try {
      const hashedPassword = hashPassword(createCadastroDto.senha);
      const phoneWithoutMask = removePhoneMask(createCadastroDto.telefone);
      const cpfWithoutMask = removeCpfMask(createCadastroDto.CPF);
      const cnpjWithoutMask = removeCnpjMask(createCadastroDto.CNPJ);

      const newRegister = {
        ...createCadastroDto,
        CPF: cpfWithoutMask,
        CNPJ: cnpjWithoutMask,
        telefone: phoneWithoutMask,
        senha: hashedPassword,
        token_dispositivo: 'token-do-dispositivo',
      };
      const [motoboy] = await this.knex('entregador')
        .insert(newRegister)
        .returning([
          'nome',
          'sobrenome',
          'email',
          'telefone',
          'data_de_nascimento',
          'mochila',
        ]);

      if (!motoboy) {
        throw new InternalServerErrorException(
          'Erro ao registrar o entregador.',
        );
      }

      return motoboy;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro interno ao tentar registrar.',
      );
    }
  }
}
