import { Test, TestingModule } from '@nestjs/testing';
import { MotoboyRepository } from '../repository/motoboy.repository';
import { FindAllMotoboyUseCase } from './find-all-motoboy.use-case';
import { InternalServerErrorException } from '@nestjs/common';

describe('FindAllMotoboyUseCase', () => {
  let findAllMotoboyUseCase: FindAllMotoboyUseCase;
  let mockRepository: Partial<MotoboyRepository>;

  beforeEach(async () => {
    mockRepository = {
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllMotoboyUseCase,
        { provide: MotoboyRepository, useValue: mockRepository },
      ],
    }).compile();

    findAllMotoboyUseCase = module.get<FindAllMotoboyUseCase>(FindAllMotoboyUseCase);
  });

  it('should be defined', () => {
    expect(findAllMotoboyUseCase).toBeDefined();
  });

  it('should throw an InternalServerErrorException when there is an error', async () => {
    (mockRepository.findAll as jest.Mock).mockRejectedValueOnce(new Error());

    await expect(findAllMotoboyUseCase.findAll()).rejects.toThrow(
      new InternalServerErrorException('Erro ao buscar Entregadores')
    );
  });
});
