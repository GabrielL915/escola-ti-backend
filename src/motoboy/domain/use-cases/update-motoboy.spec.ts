import { Test, TestingModule } from '@nestjs/testing';
import { UpdateMotoboyUseCase } from './update-motoboy';
import { MotoboyRepository } from '../repository/motoboy.repository';
import { UpdateMotoboyDto } from '../dto/update-motoboy.dto';

describe('UpdateMotoboyUseCase', () => {
  let updateMotoboyUseCase: UpdateMotoboyUseCase;
  let mockRepository: Partial<MotoboyRepository>;

  beforeEach(async () => {
    mockRepository = {
      update: jest.fn().mockResolvedValue({} as any),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateMotoboyUseCase,
        { provide: MotoboyRepository, useValue: mockRepository },
      ],
    }).compile();

    updateMotoboyUseCase =
      module.get<UpdateMotoboyUseCase>(UpdateMotoboyUseCase);
  });

  it('should be defined', () => {
    expect(updateMotoboyUseCase).toBeDefined();
  });

  it('should call the repository with correct values', async () => {
    const dto: UpdateMotoboyDto = {
      nome: 'Kleber',
      sobrenome: 'Silva',
      email: 'emailtest@example.com',
      telefone: '00000000000',
      data_de_nascimento: '01/01/2000',
      senha: '123456',
      mochila: true,
    };
    const id = '1';

    await updateMotoboyUseCase.execute({ id, input: dto });

    expect(mockRepository.update).toHaveBeenCalledWith(id, dto);
  });

});
