import { Test, TestingModule } from '@nestjs/testing';
import { FindRegisteredUseCase } from './find-registered.use-cases';
import { RegisteredRepository } from '../repository/registered.repository';
import { InternalServerErrorException } from '@nestjs/common';

describe('FindRegisteredUseCase', () => {
  let findRegisteredUseCase: FindRegisteredUseCase;
  let mockRegisteredRepository: Partial<jest.Mocked<RegisteredRepository>>;

  beforeEach(async () => {
    mockRegisteredRepository = {
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindRegisteredUseCase,
        {
          provide: RegisteredRepository,
          useValue: mockRegisteredRepository,
        },
      ],
    }).compile();

    findRegisteredUseCase = module.get<FindRegisteredUseCase>(
      FindRegisteredUseCase,
    );
  });

  it('should be defined', () => {
    expect(findRegisteredUseCase).toBeDefined();
  });

  it('should throw InternalServerErrorException when registeredRepository.findAll fails', async () => {
    mockRegisteredRepository.findAll.mockRejectedValueOnce(
      new Error('Erro ao buscar Inscritos'),
    );

    await expect(findRegisteredUseCase.findAll()).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it('should throw InternalServerErrorException when registeredRepository.findOne fails', async () => {
    const mockRegisteredId = 'mockId';

    mockRegisteredRepository.findOne.mockRejectedValueOnce(
      new Error('Erro ao buscar Inscrito por id'),
    );

    await expect(
      findRegisteredUseCase.findOne(mockRegisteredId),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
