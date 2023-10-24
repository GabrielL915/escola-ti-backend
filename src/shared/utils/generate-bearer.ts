import { LoginUseCase } from '../../auth/domain/use-cases/login.use-case';
import { RegisterUseCase } from '../../auth/domain/use-cases/register.use-case';
import { RegisterDto } from '../../auth/domain/dto/register.dto';

export class GenerateBearer {
  private motoboyData: RegisterDto = {
    nome: 'Silva',
    sobrenome: 'Kleber',
    cpf: '11111111111',
    cnpj: '11111111111111',
    email: 'exempled@gmail.com',
    telefone: '44999999999',
    data_de_nascimento: '01/01/2000',
    senha: '12345678',
    mochila: true,
    cidade: 'Maringá',
  };

  constructor(private readonly registerUseCase: RegisterUseCase, private readonly loginUseCase: LoginUseCase) {
  }

  public async createMotoboy() {
    const response = await this.registerUseCase.register(this.motoboyData);
    return response
  }

  public async getJwtToken(): Promise<string> {
    const createdMotoboy = await this.createMotoboy()
    
    const response = await this.loginUseCase.login({email: createdMotoboy.email, senha: this.motoboyData.senha, id: createdMotoboy.id})
    return response.access_token;
  }
}
