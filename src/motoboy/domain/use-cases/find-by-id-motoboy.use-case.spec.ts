import { Test, TestingModule } from '@nestjs/testing';
import { MotoboyRepository } from '../repository/motoboy.repository';
import { FindByIdMotoboyUseCase } from './find-by-id-motoboy.use-case';
import { InternalServerErrorException } from '@nestjs/common';

describe('FindByIdMotoboyUseCase', () => {
    let findByIdMotoboyUseCase: FindByIdMotoboyUseCase;
    let mockRepository: Partial<MotoboyRepository>;
  
    beforeEach(async () => {
      mockRepository = {
        findById: jest.fn(),
      };
  
      const module: TestingModule = await Test.createTestingModule({
        providers: [
            FindByIdMotoboyUseCase,
          { provide: MotoboyRepository, useValue: mockRepository },
        ],
      }).compile();
  
      findByIdMotoboyUseCase = module.get<FindByIdMotoboyUseCase>(FindByIdMotoboyUseCase);
    });
  
    it('should be defined', () => {
      expect(findByIdMotoboyUseCase).toBeDefined();
    });

    it('should throw an InternalServerErrorException when there is an error', async () => {
      const mockId = '12345';
      (mockRepository.findById as jest.Mock).mockRejectedValueOnce(new Error());

      await expect(findByIdMotoboyUseCase.findById(mockId)).rejects.toThrow(
        new InternalServerErrorException('Erro ao buscar Entregador pro Id')
      );
    });

});
