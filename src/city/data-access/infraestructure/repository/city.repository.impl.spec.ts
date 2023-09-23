import { Test, TestingModule } from '@nestjs/testing';
import { CityRepositoryImpl } from './city.repository.impl';
import { CreateCityDto } from '../../../domain/dto/create-city.dto';
import { InternalServerErrorException } from '@nestjs/common';

describe('CityRepositoryImpl', () => {
  let repository: CityRepositoryImpl;
  let mockKnex: any;

  beforeEach(async () => {
    mockKnex = {
      insert: jest.fn().mockReturnThis(),
      returning: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityRepositoryImpl,
        {
          provide: 'default_KnexModuleConnectionToken',
          useValue: mockKnex,
        },
      ],
    }).compile();

    repository = module.get<CityRepositoryImpl>(CityRepositoryImpl);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a city', async () => {
      const cityDto: CreateCityDto = {
        city: 'Test City',
        uf: 'TC',
      };

      mockKnex.returning.mockResolvedValueOnce([{ id: 1 }]);

      const city = await repository.create(cityDto);

      expect(city).toEqual(1);
    });
    it('should throw InternalServerErrorException on error', async () => {
      const cityDto: CreateCityDto = {
        city: 'Test City',
        uf: 'TC',
      };

      mockKnex.returning.mockRejectedValueOnce(InternalServerErrorException);

      await expect(repository.create(cityDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
