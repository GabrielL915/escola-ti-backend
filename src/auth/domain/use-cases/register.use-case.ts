import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { hashPassword } from '../../utils/hash-password';
import {
  removePhoneMask,
  removeCpfMask,
  removeCnpjMask,
} from '../../../shared/utils/remove-mask';
import { MotoboyRepository } from '../../../motoboy/domain/repository/motoboy.repository';

@Injectable()
export class RegisterUseCase {
  constructor(@InjectModel() private knex: Knex,
  private readonly motoboyRepository: MotoboyRepository) {}

 private async registerCity(city: string, uf: string) {
    try {
      const [id] = await this.knex('cidade')
        .insert({ cidade: city, uf: uf })
        .returning('id');
      return id;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro interno ao tentar registrar a cidade.',
        error,
      );
    }
  }

  async register(createCadastroDto: RegisterDto): Promise<any> {
    try {
      const hashedPassword = hashPassword(createCadastroDto.senha);
      const phoneWithoutMask = removePhoneMask(createCadastroDto.telefone);
      const cpfWithoutMask = removeCpfMask(createCadastroDto.cpf);
      const cnpjWithoutMask = removeCnpjMask(createCadastroDto.cnpj);
      const uf = 'PR';
      const cidade = await this.registerCity(createCadastroDto.cidade, uf);
      const newRegister = {
        nome: createCadastroDto.nome,
        sobrenome: createCadastroDto.sobrenome,
        email: createCadastroDto.email,
        data_de_nascimento: createCadastroDto.data_de_nascimento,
        mochila: createCadastroDto.mochila,
        cpf: cpfWithoutMask,
        cnpj: cnpjWithoutMask,
        telefone: phoneWithoutMask,
        senha: hashedPassword,
        token_dispositivo: 'token-do-dispositivo',
        id_endereco_de_servico: cidade.id,
      };
      const motoboy = await this.motoboyRepository.create(newRegister);
      return motoboy;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Registro já existe.', error);
      }
      throw new InternalServerErrorException(
        'Erro interno ao tentar realizar cadastro do Entregador.',
        error,
      );
    }
  }
}
