import { Test, TestingModule } from '@nestjs/testing';
import { FindObjectiveUseCase } from './find-objective.use-cases';
import { ObjectiveRepository } from '../repository/objective.repository';
import { InternalServerErrorException } from '@nestjs/common';

describe('FindObjectiveUseCase', () => {
  let findObjectiveUseCase: FindObjectiveUseCase;
  let mockObjectiveRepository: Partial<jest.Mocked<ObjectiveRepository>>;

  beforeEach(async () => {
    mockObjectiveRepository = {
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindObjectiveUseCase,
        {
          provide: ObjectiveRepository,
          useValue: mockObjectiveRepository,
        },
      ],
    }).compile();

    findObjectiveUseCase =
      module.get<FindObjectiveUseCase>(FindObjectiveUseCase);
  });

  it('should be defined', () => {
    expect(findObjectiveUseCase).toBeDefined();
  });

  it('should throw InternalServerErrorException when objectiveRepository.findAll fails', async () => {
    mockObjectiveRepository.findAll.mockRejectedValueOnce(
      new Error('Erro ao buscar objetivos'),
    );

    await expect(findObjectiveUseCase.findAll()).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it('should throw InternalServerErrorException when objectiveRepository.findOne fails', async () => {
    const mockObjectiveId = 'mockId';

    mockObjectiveRepository.findOne.mockRejectedValueOnce(
      new Error('Erro ao buscar objetivo por id'),
    );

    await expect(findObjectiveUseCase.findOne(mockObjectiveId)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
