import { Test, TestingModule } from '@nestjs/testing';
import { MotoboyRepository } from '../repository/motoboy.repository';
import { FindByEmailMotoboyUseCase } from './find-by-email-motoboy.use-case';
import { InternalServerErrorException } from '@nestjs/common';

describe('FindByEmailMotoboyUseCase', () => {
  let findByEmailMotoboyUseCase: FindByEmailMotoboyUseCase;
  let mockRepository: Partial<MotoboyRepository>;

  beforeEach(async () => {
    mockRepository = {
      findByEmail: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindByEmailMotoboyUseCase,
        { provide: MotoboyRepository, useValue: mockRepository },
      ],
    }).compile();

    findByEmailMotoboyUseCase = module.get<FindByEmailMotoboyUseCase>(FindByEmailMotoboyUseCase);
  });

  it('should be defined', () => {
    expect(findByEmailMotoboyUseCase).toBeDefined();
  });

  it('should throw an InternalServerErrorException when there is an error', async () => {
    const mockEmail = 'test@example.com';
    (mockRepository.findByEmail as jest.Mock).mockRejectedValueOnce(new Error());

    await expect(findByEmailMotoboyUseCase.findByEmail(mockEmail)).rejects.toThrow(
      new InternalServerErrorException('Erro ao buscar Entregador por Email')
    );
  });
});
