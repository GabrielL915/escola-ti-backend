import { Test, TestingModule } from '@nestjs/testing';
import { UpdateRegisteredUseCase } from './update-registered.use-case';
import { RegisteredRepository } from '../repository/registered.repository';
import { InternalServerErrorException } from '@nestjs/common';
import { UpdateRegisteredDto } from '../dto/update-registered.dto';

describe('UpdateRegisteredUseCase', () => {
  let updateRegisteredUseCase: UpdateRegisteredUseCase;
  let mockRegisteredRepository: Partial<jest.Mocked<RegisteredRepository>>;

  beforeEach(async () => {
    mockRegisteredRepository = {
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateRegisteredUseCase,
        {
          provide: RegisteredRepository,
          useValue: mockRegisteredRepository,
        },
      ],
    }).compile();

    updateRegisteredUseCase = module.get<UpdateRegisteredUseCase>(
      UpdateRegisteredUseCase,
    );
  });

  it('should be defined', () => {
    expect(updateRegisteredUseCase).toBeDefined();
  });

  it('should throw InternalServerErrorException when registeredRepository.update fails', async () => {
    const mockRegisteredId = 'mockId';
    const mockUpdateDto: UpdateRegisteredDto = {
      id_entregador: '8765-4321',
      id_campanha: 'hgef-dcba',
      data_de_inscricao: '2023-09-21',
      entregas_ignoradas: 5,
      entregas_recusadas: 3,
    };

    mockRegisteredRepository.update.mockRejectedValueOnce(
      new Error('Erro ao atualizar Inscrito'),
    );

    await expect(
      updateRegisteredUseCase.update(mockRegisteredId, mockUpdateDto),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
