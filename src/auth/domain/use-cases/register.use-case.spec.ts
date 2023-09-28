import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUseCase } from './register.use-case';
import {
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { MotoboyRepository } from '../../../motoboy/domain/repository/motoboy.repository';
import { CityRepository } from '../../../city/domain/repository/city.repository';

describe('RegisterUseCase', () => {
  let registerUseCase: RegisterUseCase;
  let mockRepository: Partial<MotoboyRepository>;
  let mockCityRepository: Partial<CityRepository>;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUseCase,
        { provide: MotoboyRepository, useValue: mockRepository },
        { provide: CityRepository, useValue: mockCityRepository },
      ],
    }).compile();

    registerUseCase = module.get<RegisterUseCase>(RegisterUseCase);
  });

  it('should be defined', () => {
    expect(registerUseCase).toBeDefined();
  });

  it('should throw an InternalServerErrorException on trying to register', async () => {
    const mockRegister = {
      nome: 'João',
      sobrenome: 'Almeida',
      email: '',
      data_de_nascimento: '',
      mochila: false,
      cpf: '',
      cnpj: '',
      telefone: '',
      senha: '',
      token_dispositivo: '',
      cidade: '',
    };
    (mockRepository.create as jest.Mock).mockRejectedValueOnce(new Error());

    await expect(registerUseCase.register(mockRegister)).rejects.toThrow(
      InternalServerErrorException,
    );
  });

   /*  it('should throw an ConflictException on trying to register', async () => {
        const mockRegister = {
        nome: 'João',
        sobrenome: 'Almeida',
        email: '',
        data_de_nascimento: '',
        mochila: false,
        cpf: '',
        cnpj: '',
        telefone: '',
        senha: '',
        token_dispositivo: '',
        cidade: '',
        };
        (mockRepository.create as jest.Mock).mockRejectedValueOnce({
        code: '23505',
        });
    
        await expect(registerUseCase.register(mockRegister)).rejects.toThrow(
        ConflictException,
        );
    }); */
});
