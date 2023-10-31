import { Test, TestingModule } from '@nestjs/testing';
import { MotoboyRepository } from '../repository/motoboy.repository';
import { InternalServerErrorException } from '@nestjs/common';
import { UpdateMotoboyUseCase } from './update-motoboy.use-case';
import { UpdateMotoboyRequestDto } from    '../dto/update-motoboy-request.dto';

describe('UpdateMotoboyUseCase', () => {
  let service: UpdateMotoboyUseCase;
  let mockMotoboyRepository: jest.Mocked<MotoboyRepository>;

  beforeEach(async () => {
    mockMotoboyRepository = {
      update: jest.fn(),
    } as unknown as jest.Mocked<MotoboyRepository>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateMotoboyUseCase,
        {
          provide: MotoboyRepository,
          useValue: mockMotoboyRepository,
        },
      ],
    }).compile();

    service = module.get<UpdateMotoboyUseCase>(UpdateMotoboyUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw InternalServerErrorException when there is an error', async () => {
    mockMotoboyRepository.update.mockRejectedValue(new Error('Fake error'));

    await expect(service.update('1', {} as UpdateMotoboyRequestDto)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
