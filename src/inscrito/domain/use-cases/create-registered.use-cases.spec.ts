import { Test, TestingModule } from '@nestjs/testing';
import { CreateRegisteredUseCase } from './create-registered.use-cases';
import { RegisteredRepository } from '../repository/registered.repository';
import { InternalServerErrorException } from '@nestjs/common';
import { CreateRegisteredDto } from '../dto/create-registered.dto';

describe('CreateRegisteredUseCase', () => {
  let createRegisteredUseCase: CreateRegisteredUseCase;
  let mockRegisteredRepository: Partial<jest.Mocked<RegisteredRepository>>;

  beforeEach(async () => {
    mockRegisteredRepository = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateRegisteredUseCase,
        {
          provide: RegisteredRepository,
          useValue: mockRegisteredRepository,
        },
      ],
    }).compile();

    createRegisteredUseCase = module.get<CreateRegisteredUseCase>(
      CreateRegisteredUseCase,
    );
  });

  it('should be defined', () => {
    expect(createRegisteredUseCase).toBeDefined();
  });

  it('should throw InternalServerErrorException when registeredRepository.create fails', async () => {
    mockRegisteredRepository.create.mockRejectedValueOnce(
      new Error('Erro ao criar Inscrito'),
    );

    const mockRegisteredDto: CreateRegisteredDto = {
      id_entregador: '1234-5678',
      id_campanha: 'abcd-efgh',
      data_de_inscricao: '2023-09-21',
      entregas_ignoradas: 5,
      entregas_recusadas: 3,
    };
    await expect(
      createRegisteredUseCase.create(mockRegisteredDto),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
