import { Test, TestingModule } from '@nestjs/testing';
import { UpdateMetaUseCase } from './update-meta.use-case';
import { MetaRepository } from '../repository/meta.repository';
import { InternalServerErrorException } from '@nestjs/common';
import { UpdateMetaDto } from '../dto/update-meta.dto';

describe('UpdateMetaUseCase', () => {
  let updateMetaUseCase: UpdateMetaUseCase;
  let mockMetaRepository: Partial<jest.Mocked<MetaRepository>>;

  beforeEach(async () => {
    mockMetaRepository = {
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateMetaUseCase,
        {
          provide: MetaRepository,
          useValue: mockMetaRepository,
        },
      ],
    }).compile();

    updateMetaUseCase = module.get<UpdateMetaUseCase>(UpdateMetaUseCase);
  });

  it('should be defined', () => {
    expect(updateMetaUseCase).toBeDefined();
  });

  it('should throw InternalServerErrorException when metaRepository.update fails', async () => {
    const mockMetaId = 'mockId';

    mockMetaRepository.update.mockRejectedValueOnce(
      new Error('Erro ao atualizar meta'),
    );

    const mockMetaDto: UpdateMetaDto = {
      id_inscrito: '1',
      id_campanha: '1',
      id_objetivo: '1',
      valor_atingido: 25,
    };

    await expect(
      updateMetaUseCase.update(mockMetaId, mockMetaDto),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
