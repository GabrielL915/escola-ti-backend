import { Test, TestingModule } from '@nestjs/testing';
import { UpdateObjectiveUseCase } from './update-objective.use-case';
import { ObjectiveRepository } from '../repository/objective.repository';
import { InternalServerErrorException } from '@nestjs/common';
import { UpdateObjectiveDto } from '../dto/update-objective.dto';

describe('UpdateObjectiveUseCase', () => {
  let updateObjectiveUseCase: UpdateObjectiveUseCase;
  let mockObjectiveRepository: Partial<jest.Mocked<ObjectiveRepository>>;

  beforeEach(async () => {
    mockObjectiveRepository = {
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateObjectiveUseCase,
        {
          provide: ObjectiveRepository,
          useValue: mockObjectiveRepository,
        },
      ],
    }).compile();

    updateObjectiveUseCase = module.get<UpdateObjectiveUseCase>(
      UpdateObjectiveUseCase,
    );
  });

  it('should be defined', () => {
    expect(updateObjectiveUseCase).toBeDefined();
  });

  it('should throw InternalServerErrorException when objectiveRepository.update fails', async () => {
    const mockObjectiveId = 'mockId';

    mockObjectiveRepository.update.mockRejectedValueOnce(
      new Error('Erro ao atualizar objetivo'),
    );

    const mockObjectiveDto: UpdateObjectiveDto = {
      id_campanha: '1',
      titulo: 'Teste',
      descricao: 'Teste',
      premio_associado: 25,
      meta: 25,
    };

    await expect(
      updateObjectiveUseCase.update(mockObjectiveId, mockObjectiveDto),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
