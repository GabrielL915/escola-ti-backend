import { Test, TestingModule } from '@nestjs/testing';
import { UpdateMotoboyUseCase } from './update-motoboy';
import { MotoboyRepository } from '../repository/motoboy.repository';
import { UpdateMotoboyDto } from '../dto/update-motoboy.dto';
import { HttpException } from '@nestjs/common';

describe('UpdateMotoboyUseCase', () => {
  let updateMotoboyUseCase: UpdateMotoboyUseCase;
  let mockRepository: Partial<MotoboyRepository>;

  const validDto = {
    nome: 'Kleber',
    sobrenome: 'Silva',
    email: 'emailtest@example.com',
    telefone: '00000000000',
    data_de_nascimento: '01/01/2000',
    senha: '12345678',
    mochila: true,
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

  it('should call the repository with correct values', async () => {
    const dto: UpdateMotoboyDto = {
      ...validDto,
    };
    const id = '1';

    await updateMotoboyUseCase.execute({ id, input: dto });

    expect(mockRepository.update).toHaveBeenCalledWith(id, dto);
  });

  it('should return the result from repository', async () => {
    const dto: UpdateMotoboyDto = {
      ...validDto,
    };
    const id = '1';

    const result = await updateMotoboyUseCase.execute({ id, input: dto });

    expect(result).toEqual({});
  });

  it('should throw an error if the repository fails', async () => {
    const dto: UpdateMotoboyDto = {
      ...validDto,
    };
    const id = '1';

    (mockRepository.update as jest.Mock).mockRejectedValue(new Error());

    await expect(
      updateMotoboyUseCase.execute({ id, input: dto }),
    ).rejects.toThrow(new Error());
  });

  it('should throw an error if the repository throws an HttpException', async () => {
    const dto: UpdateMotoboyDto = {
      ...validDto,
    };
    const id = '1';

    (mockRepository.update as jest.Mock).mockRejectedValue(
      new HttpException('Test', 400),
    );

    await expect(
      updateMotoboyUseCase.execute({ id, input: dto }),
    ).rejects.toThrow(new HttpException('Test', 400));
  });
});
