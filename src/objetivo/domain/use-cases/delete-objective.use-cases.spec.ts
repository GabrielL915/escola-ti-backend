import { Test, TestingModule } from '@nestjs/testing';
import { DeleteObjectiveUseCase } from './delete-objective.use-cases';
import { ObjectiveRepository } from '../repository/objective.repository';
import { InternalServerErrorException } from '@nestjs/common';

describe('DeleteObjectiveUseCase', () => {
  let deleteObjectiveUseCase: DeleteObjectiveUseCase;
  let mockObjectiveRepository: Partial<jest.Mocked<ObjectiveRepository>>;

  beforeEach(async () => {
    mockObjectiveRepository = {
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteObjectiveUseCase,
        {
          provide: ObjectiveRepository,
          useValue: mockObjectiveRepository,
        },
      ],
    }).compile();

    deleteObjectiveUseCase = module.get<DeleteObjectiveUseCase>(
      DeleteObjectiveUseCase,
    );
  });

  it('should be defined', () => {
    expect(deleteObjectiveUseCase).toBeDefined();
  });

  it('should throw InternalServerErrorException when objectiveRepository.delete fails', async () => {
    const mockObjectiveId = 'mockId';

    mockObjectiveRepository.delete.mockRejectedValueOnce(
      new InternalServerErrorException('Erro ao deletar objetivo'),
    );

    await expect(
      deleteObjectiveUseCase.delete(mockObjectiveId),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
