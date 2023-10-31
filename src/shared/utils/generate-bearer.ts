import { LoginUseCase } from '../../auth/domain/use-cases/login.use-case';
import { RegisterUseCase } from '../../auth/domain/use-cases/register.use-case';
import { RegisterDto } from '../../auth/domain/dto/register.dto';

export class GenerateBearer {
  private motoboyData: RegisterDto = {
    nome: 'Silva',
    sobrenome: 'Kleber',
    cpf: '11111111111',
    cnpj: '11111111111111',
    email: 'dfsdfssdags@gmail.com',
    telefone: '44999999999',
    data_de_nascimento: '01/01/2000',
    senha: '12345678',
    mochila: true,
    cidade: 'Maringá',
  };

  constructor(
    private readonly loginUseCase?: LoginUseCase,
    private readonly registerUseCase?: RegisterUseCase,
  ) {}

  public async createMotoboy() {
    if (!this.registerUseCase) {
     return
    }
    const response = await this.registerUseCase.register(this.motoboyData);
    return response;
  }

  public async getJwtToken(emailSend?: string, passwordSend?: string, idSend?: string): Promise<string> {
    let createdMotoboy;
    if (!emailSend || !passwordSend || !idSend) {
      createdMotoboy = await this.createMotoboy();
    }

    const response = await this.loginUseCase.login({
      email: emailSend,
      senha: passwordSend,
      id: idSend,
    });
    return response.access_token;
  }
}
