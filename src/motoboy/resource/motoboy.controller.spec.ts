import { Test, TestingModule } from '@nestjs/testing';
import { MotoboyController } from './motoboy.controller';
import { UpdateMotoboyUseCase } from '../domain/use-cases/update-motoboy';
import { UpdateMotoboyDto } from '../domain/dto/update-motoboy.dto';
import { MotoboyRepository } from '../domain/repository/motoboy.repository';
import { HttpException } from '@nestjs/common';

class MockMotoboyRepository extends MotoboyRepository {
  update = jest.fn();
}

class MockUpdateMotoboyUseCase extends UpdateMotoboyUseCase {
  constructor() {
    super(new MockMotoboyRepository());
  }

  execute = jest.fn();
}

const validDto = {
  nome: 'Kleber',
  sobrenome: 'Silva',
  email: 'emailtest@example.com',
  telefone: '00000000000',
  data_de_nascimento: '01/01/2000',
  senha: '12345678',
  mochila: true,
};

describe('MotoboyController', () => {
  let controller: MotoboyController;
  let mockUseCase: MockUpdateMotoboyUseCase;

  beforeEach(async () => {
    mockUseCase = new MockUpdateMotoboyUseCase();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotoboyController],
      providers: [{ provide: UpdateMotoboyUseCase, useValue: mockUseCase }],
    }).compile();

    controller = module.get<MotoboyController>(MotoboyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the update method', async () => {
    const dto: UpdateMotoboyDto = {
      ...validDto,
    };

    await controller.update('1', dto);

    expect(mockUseCase.execute).toHaveBeenCalledWith({ id: '1', input: dto });
  });

  it('should return the updated motoboy', async () => {
    const dto: UpdateMotoboyDto = {
      ...validDto,
    };

    const expectedMotoboy = {
      id: '1',
      nome: 'Kleber',
      sobrenome: 'Silva',
      email: 'emailtest@example.com',
      telefone: '00000000000',
      data_de_nascimento: '01/01/2000',
      senha: '123456',
      mochila: true,
      data_de_cadastro: '01/01/2000',
      entregas_realizadas: 0,
      aiqcoins: 0,
      ativo: true,
      token_dispositivo: 'token',
      id_endereco_de_servico: null,
    };

    mockUseCase.execute.mockReturnValue(expectedMotoboy);

    const motoboy = await controller.update('1', dto);
    expect(motoboy).toEqual(expectedMotoboy);
  });

  it('should throw an error when motoboy id is not valid', async () => {
    const id = 'invalidId';
    const dto: UpdateMotoboyDto = {
      ...validDto,
    };

    mockUseCase.execute.mockImplementation(() => {
      throw new HttpException('Motoboy não encontrado', 404);
    });

    await expect(
      async () => await controller.update(id, dto),
    ).rejects.toThrowError(new HttpException('Motoboy não encontrado', 404));
  });

  it('should throw an error when motoboy id is not found', async () => {
    const id = '';
    const dto: UpdateMotoboyDto = {
      ...validDto,
    };

    mockUseCase.execute.mockImplementation(() => {
      throw new HttpException('Motoboy não encontrado', 404);
    });

    await expect(
      async () => await controller.update(id, dto),
    ).rejects.toThrowError(new HttpException('Motoboy não encontrado', 404));
  });

  it('should throw an error invalid email format', async () => {
    const id = '1';
    const dto: UpdateMotoboyDto = {
      ...validDto,
      email: 'invalidEmail',
    };

    mockUseCase.execute.mockImplementation(() => {
      throw new HttpException('Email inválido', 400);
    });

    await expect(
      async () => await controller.update(id, dto),
    ).rejects.toThrowError(new HttpException('Email inválido', 400));
  });

  it('should throw an error invalid phone format', async () => {
    const id = '1';
    const dto: UpdateMotoboyDto = {
      ...validDto,
      telefone: 'invalidPhone',
    };

    mockUseCase.execute.mockImplementation(() => {
      throw new HttpException('Telefone inválido', 400);
    });

    await expect(
      async () => await controller.update(id, dto),
    ).rejects.toThrowError(new HttpException('Telefone inválido', 400));
  });

  it('should throw an error invalid birth date format', async () => {
    const id = '1';
    const dto: UpdateMotoboyDto = {
      ...validDto,
      data_de_nascimento: 'invalidBirthDate',
    };

    mockUseCase.execute.mockImplementation(() => {
      throw new HttpException('Data de nascimento inválida', 400);
    });

    await expect(
      async () => await controller.update(id, dto),
    ).rejects.toThrowError(
      new HttpException('Data de nascimento inválida', 400),
    );
  });
  it('should handle unexpected errors', async () => {
    const id = '1';
    const dto: UpdateMotoboyDto = {
      ...validDto,
    };

    mockUseCase.execute.mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    await expect(
      async () => await controller.update(id, dto),
    ).rejects.toThrowError(new Error('Unexpected error'));
  });
});
