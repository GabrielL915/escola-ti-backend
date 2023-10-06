import { Test, TestingModule } from '@nestjs/testing';
import { RefreshTokenRepositoryImpl } from './refresh-token.repository.impl';
import { InternalServerErrorException } from '@nestjs/common';

describe('RefreshTokenRepositoryImpl', () => {
  let repository: RefreshTokenRepositoryImpl;
  let mockKnex: any;

  beforeEach(async () => {
    mockKnex = {
      insert: jest.fn().mockReturnThis(),
      returning: jest.fn(),
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefreshTokenRepositoryImpl,
        {
          provide: 'default_KnexModuleConnectionToken',
          useValue: mockKnex,
        },
      ],
    }).compile();

    repository = module.get<RefreshTokenRepositoryImpl>(
      RefreshTokenRepositoryImpl,
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
