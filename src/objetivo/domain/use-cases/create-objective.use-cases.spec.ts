import { Test, TestingModule } from '@nestjs/testing';
import { CreateObjectiveUseCase } from './create-objective.use-cases';
import { ObjectiveRepository } from '../repository/objective.repository';
import { InternalServerErrorException } from '@nestjs/common';
import { CreateObjectiveDto } from '../dto/create-objective.dto';

describe('CreateObjectiveUseCase', () => {
  let createObjectiveUseCase: CreateObjectiveUseCase;
  let mockObjectiveRepository: Partial<jest.Mocked<ObjectiveRepository>>;

  beforeEach(async () => {
    mockObjectiveRepository = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateObjectiveUseCase,
        {
          provide: ObjectiveRepository,
          useValue: mockObjectiveRepository,
        },
      ],
    }).compile();

    createObjectiveUseCase = module.get<CreateObjectiveUseCase>(
      CreateObjectiveUseCase,
    );
  });

  it('should be defined', () => {
    expect(createObjectiveUseCase).toBeDefined();
  });

  it('should throw InternalServerErrorException when objectiveRepository.create fails', async () => {
    mockObjectiveRepository.create.mockRejectedValueOnce(
      new Error('Erro ao criar objetivo'),
    );

    const mockObjectiveDto: CreateObjectiveDto = {
      id_campanha: '1',
      titulo: 'Teste',
      descricao: 'Teste',
      premio_associado: 25,
      meta: 25,
    };

    await expect(
      createObjectiveUseCase.create(mockObjectiveDto),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
