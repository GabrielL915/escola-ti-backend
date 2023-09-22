import { Test, TestingModule } from '@nestjs/testing';
import { UpdateMotoboyUseCase } from './update-motoboy.use-case';
import { MotoboyRepository } from '../repository/motoboy.repository';
import { UpdateMotoboyDto } from '../dto/update-motoboy.dto';
import { InternalServerErrorException } from '@nestjs/common';

describe('UpdateMotoboyUseCase', () => {
  let updateMotoboyUseCase: UpdateMotoboyUseCase;
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
      update: jest.fn().mockResolvedValue({} as any),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateMotoboyUseCase,
        { provide: MotoboyRepository, useValue: mockRepository },
      ],
    }).compile();

    updateMotoboyUseCase =
      module.get<UpdateMotoboyUseCase>(UpdateMotoboyUseCase);
  });

  it('should be defined', () => {
    expect(updateMotoboyUseCase).toBeDefined();
  });

  it('should throw an HttpException', async () => {
    const dto: UpdateMotoboyDto = {
      ...validDto,
    };
    const id = '1';

    (mockRepository.update as jest.Mock).mockRejectedValue(
      new InternalServerErrorException('Erro ao atualizar Entregador'),
    );

    await expect(
      updateMotoboyUseCase.update({ id, input: dto }),
    ).rejects.toThrow(new InternalServerErrorException('Erro ao atualizar Entregador'));
  });
});
