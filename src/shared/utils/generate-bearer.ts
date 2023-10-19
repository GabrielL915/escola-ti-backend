import { MotoboyRepository } from '../../motoboy/domain/repository/motoboy.repository';
import { LoginUseCase } from '../../auth/domain/use-cases/login.use-case';

export class GenerateBearer {
  private motoboyData: any = {
    nome: 'Kleber',
    sobrenome: 'Silva',
    cpf: '00000000000',
    cnpj: '00000000000000',
    email: 'emailtest@example.com',
    telefone: '44999999999',
    data_de_nascimento: '01/01/2000',
    senha: '12345678',
    mochila: true,
    token_dispositivo: "123",
    id_endereco_de_servico: '9d23e11f-602b-4fff-b484-4a2ddb61f02c',
  };

  constructor(private readonly motoboyRepository: MotoboyRepository, private readonly loginUseCase: LoginUseCase) {
  }

  public async createMotoboy() {
    const response = await this.motoboyRepository.create(this.motoboyData);
    return response
  }

  public async getJwtToken(): Promise<string>{
    const validate = await this.loginUseCase.validateEntregador(this.motoboyData.email, this.motoboyData.senha);
    const response = await this.loginUseCase.login({email: validate.email, senha: validate.senha, id: validate.id})
    console.log(response.access_token)
    return response.access_token;
  }
}
