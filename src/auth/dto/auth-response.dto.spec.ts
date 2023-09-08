import { plainToClass } from 'class-transformer';
import { AuthResponseDto } from './auth-response.dto';

describe('AuthResponseDto', () => {
  it('should exclude CPF, CNPJ, and senha', () => {
    const object = {
      nome: 'João',
      sobrenome: 'Silva',
      CPF: '123.456.789-00',
      CNPJ: '12.345.678/0001-23',
      email: 'joao@email.com',
      telefone: '(00) 00000-0000',
      data_de_nascimento: '1999-01-01',
      senha: 'password123',
      mochila: true,
      data_de_cadastro: '2021-01-01',
    };

    const transformedDto = plainToClass(AuthResponseDto, object);
    expect(transformedDto.CPF).toBeUndefined();
    expect(transformedDto.CNPJ).toBeUndefined();
    expect(transformedDto.senha).toBeUndefined();
  });
});
