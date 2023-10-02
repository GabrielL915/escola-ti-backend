import { Test, TestingModule } from '@nestjs/testing';
import { MotoboyRepository } from '../repository/motoboy.repository';
import { CreateMotoboyUseCase } from './create-motoboy.use-case';
import { InternalServerErrorException } from '@nestjs/common';
import { CreateMotoboyDto } from '../dto/create-motoboy.dto';

describe('CreateMotoboyUseCase', () => {
  let createMotoboyUseCase: CreateMotoboyUseCase;
  let mockRepository: Partial<MotoboyRepository>;

  const validDto = {
    nome: 'Kleber',
    sobrenome: 'Silva',
    cpf: '000.000.000-00',
    cnpj: '00.000.000/0000-00',
    email: 'emailtest@example.com',
    telefone: '(44) 99999-9999',
    data_de_nascimento: '01/01/2000',
    senha: '12345678',
    mochila: true,
    id_endereco_de_servico: '00000000-0000-0000-0000-000000000000',
  };

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn().mockResolvedValue({} as any),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateMotoboyUseCase,
        { provide: MotoboyRepository, useValue: mockRepository },
      ],
    }).compile();

    createMotoboyUseCase =
      module.get<CreateMotoboyUseCase>(CreateMotoboyUseCase);
  });

  it('should be defined', () => {
    expect(createMotoboyUseCase).toBeDefined();
  });

  it('should throw an error if the repository throws an HttpException', async () => {
    const dto: CreateMotoboyDto = {
      ...validDto,
    };

    (mockRepository.create as jest.Mock).mockRejectedValue(
      new InternalServerErrorException('Erro ao criar Entregador'),
    );

    await expect(createMotoboyUseCase.create(dto)).rejects.toThrow(
      new InternalServerErrorException('Erro ao criar Entregador'),
    );
  });
});
