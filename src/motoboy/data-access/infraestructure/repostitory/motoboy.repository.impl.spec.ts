import { Test, TestingModule } from '@nestjs/testing';
import { MotoboyRepositoryImpl } from './motoboy.repository.impl';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('MotoboyRepositoryImpl', () => {
  let repository: MotoboyRepositoryImpl;
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
        MotoboyRepositoryImpl,
        {
          provide: 'default_KnexModuleConnectionToken',
          useValue: mockKnex,
        },
      ],
    }).compile();

    repository = module.get<MotoboyRepositoryImpl>(MotoboyRepositoryImpl);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
  it('should throw an NotFoundException if the motoboy id is not found', async () => {
    mockKnex.where.mockReturnThis(); // Adicione esta linha
    mockKnex.select.mockResolvedValueOnce([]); // Simula que nenhum motoboy foi encontrado
    await expect(
      repository.findById('00000000-0000-0000-0000-000000000000'),
    ).rejects.toThrow(new NotFoundException('Entregador não encontrado'));
  });

  it('should throw an NotFoundException if the motoboy email is not found', async () => {
    mockKnex.select.mockReturnThis(); // Adicione esta linha
    mockKnex.where.mockResolvedValueOnce([]); // Simula que nenhum motoboy foi encontrado
    await expect(
      repository.findByEmail('joao.almeida@example.com'),
    ).rejects.toThrow(new NotFoundException('Entregador não encontrado'));
  });
  
});
