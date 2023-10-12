import { Test, TestingModule } from '@nestjs/testing';
import { DeleteRegisteredUseCase } from './delete-registered.use-cases';
import { RegisteredRepository } from '../repository/registered.repository';
import { InternalServerErrorException } from '@nestjs/common';

describe('DeleteRegisteredUseCase', () => {
  let deleteRegisteredUseCase: DeleteRegisteredUseCase;
  let mockRegisteredRepository: Partial<jest.Mocked<RegisteredRepository>>;

  beforeEach(async () => {
    mockRegisteredRepository = {
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteRegisteredUseCase,
        {
          provide: RegisteredRepository,
          useValue: mockRegisteredRepository,
        },
      ],
    }).compile();

    deleteRegisteredUseCase = module.get<DeleteRegisteredUseCase>(
      DeleteRegisteredUseCase,
    );
  });

  it('should be defined', () => {
    expect(deleteRegisteredUseCase).toBeDefined();
  });

  it('should throw InternalServerErrorException when registeredRepository.delete fails', async () => {
    const mockRegisteredId = 'mockId';

    mockRegisteredRepository.delete.mockRejectedValueOnce(
      new Error('Erro ao deletar Inscrito'),
    );

    await expect(
      deleteRegisteredUseCase.delete(mockRegisteredId),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
