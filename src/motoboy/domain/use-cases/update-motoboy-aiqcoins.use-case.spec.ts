import { Test, TestingModule } from '@nestjs/testing';
import { MotoboyRepository } from '../repository/motoboy.repository';
import { InternalServerErrorException } from '@nestjs/common';
import { UpdateMotoboyAiqcoinsUseCase } from './update-motoboy-aiqcoins.use-case';

describe('UpdateMotoboyAiqcoinsUseCase', () => {
  let service: UpdateMotoboyAiqcoinsUseCase;
  let mockMotoboyRepository: jest.Mocked<MotoboyRepository>;

  beforeEach(async () => {
    mockMotoboyRepository = {
      updateAiqcoins: jest.fn(),
    } as unknown as jest.Mocked<MotoboyRepository>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateMotoboyAiqcoinsUseCase,
        {
          provide: MotoboyRepository,
          useValue: mockMotoboyRepository,
        },
      ],
    }).compile();

    service = module.get<UpdateMotoboyAiqcoinsUseCase>(
      UpdateMotoboyAiqcoinsUseCase,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw InternalServerErrorException when there is an error', async () => {
    mockMotoboyRepository.updateAiqcoins.mockRejectedValue(
      new Error('Fake error'),
    );

    await expect(service.update('1', 1)).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it('should throw NotFoundException when motoboy is not found', async () => {
    mockMotoboyRepository.updateAiqcoins.mockResolvedValue(
        undefined,
    );
    await expect(service.update('1', 1)).rejects.toThrow(
      InternalServerErrorException,
    );
  })
});
