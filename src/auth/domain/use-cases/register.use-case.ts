import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { hashPassword } from '../../utils/hash-password';
import {
  removePhoneMask,
  removeCpfMask,
  removeCnpjMask,
} from '../../../shared/utils/remove-mask';
import { MotoboyRepository } from '../../../motoboy/domain/repository/motoboy.repository';
import { CityRepository } from '../../../city/domain/repository/city.repository';
@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly motoboyRepository: MotoboyRepository,
    private readonly cityRepository: CityRepository,
  ) {}

  async register(input: RegisterDto): Promise<any> {
    try {
      const hashedPassword = hashPassword(input.senha);
      const phoneWithoutMask = removePhoneMask(input.telefone);
      const cpfWithoutMask = removeCpfMask(input.cpf);
      const cnpjWithoutMask = removeCnpjMask(input.cnpj);
      const uf = 'PR';
      const inputCity = {
        city: input.cidade,
        uf: uf,
      };
      const city = await this.cityRepository.create(inputCity);
      const newRegister = {
        nome: input.nome,
        sobrenome: input.sobrenome,
        email: input.email,
        data_de_nascimento: input.data_de_nascimento,
        mochila: input.mochila,
        cpf: cpfWithoutMask,
        cnpj: cnpjWithoutMask,
        telefone: phoneWithoutMask,
        senha: hashedPassword,
        token_dispositivo: 'token-do-dispositivo',
        id_endereco_de_servico: city.id,
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
