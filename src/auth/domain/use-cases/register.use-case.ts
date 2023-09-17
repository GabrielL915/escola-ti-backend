import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  Logger,
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
  private readonly logger = new Logger(RegisterUseCase.name);
  constructor(@InjectModel() private knex: Knex) {}

  async registerCity(city: string, UF: string) {
    try {
      const [id] = await this.knex('cidade')
        .insert({ cidade: city, UF })
        .returning('id');
      return id;
    } catch (error) {
      this.logger.error(`Failed to register city: ${error.message}`);
      throw new InternalServerErrorException(
        'Erro interno ao tentar registrar a cidade.', error,
      );
    }
  }

  async register(createCadastroDto: RegisterDto): Promise<AuthResponseDto> {
    try {
      const hashedPassword = hashPassword(createCadastroDto.senha);
      const phoneWithoutMask = removePhoneMask(createCadastroDto.telefone);
      const cpfWithoutMask = removeCpfMask(createCadastroDto.CPF);
      const cnpjWithoutMask = removeCnpjMask(createCadastroDto.CNPJ);
      const UF = 'PR';
      const cidade = await this.registerCity(createCadastroDto.cidade, UF);
      const newRegister = {
        nome: createCadastroDto.nome,
        sobrenome: createCadastroDto.sobrenome,
        email: createCadastroDto.email,
        data_de_nascimento: createCadastroDto.data_de_nascimento,
        mochila: createCadastroDto.mochila,
        CPF: cpfWithoutMask,
        CNPJ: cnpjWithoutMask,
        telefone: phoneWithoutMask,
        senha: hashedPassword,
        token_dispositivo: 'token-do-dispositivo',
        id_endereco_de_servico: cidade.id,
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
      return motoboy;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Registro já existe.', error);
      }
      this.logger.error(`Failed to register: ${error.message}`);
      throw new InternalServerErrorException(
        'Erro interno ao tentar registrar.',
        error,
      );
    }
  }
}
