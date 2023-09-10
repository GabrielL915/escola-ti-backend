import { Test, TestingModule } from '@nestjs/testing';
import { MotoboyController } from './motoboy.controller';
import { UpdateMotoboyUseCase } from '../domain/use-cases/update-motoboy';
import { UpdateMotoboyDto } from '../domain/dto/update-motoboy.dto';
import { MotoboyRepository } from '../domain/repository/motoboy.repository';

class MockMotoboyRepository extends MotoboyRepository {
  update = jest.fn();
}

class MockUpdateMotoboyUseCase extends UpdateMotoboyUseCase {
  constructor() {
    super(new MockMotoboyRepository());
  }

  execute = jest.fn();
}

describe('MotoboyController', () => {
  let controller: MotoboyController;
  let mockUseCase: MockUpdateMotoboyUseCase;

  beforeEach(async () => {
    mockUseCase = new MockUpdateMotoboyUseCase();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotoboyController],
      providers: [{ provide: UpdateMotoboyUseCase, useValue: mockUseCase }],
    }).compile();

    controller = module.get<MotoboyController>(MotoboyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the update method', async () => {
    const dto: UpdateMotoboyDto = {
      nome: 'Kleber',
      sobrenome: 'Silva',
      email: 'emailtest@example.com',
      telefone: '00000000000',
      data_de_nascimento: '01/01/2000',
      senha: '123456',
      mochila: true,
    };

    await controller.update('1', dto);

    expect(mockUseCase.execute).toHaveBeenCalledWith({ id: '1', input: dto });
  });

  it('should return the updated motoboy', async () => {
    const dto: UpdateMotoboyDto = {
      nome: 'Kleber',
      sobrenome: 'Silva',
      email: 'emailtest@example.com',
      telefone: '00000000000',
      data_de_nascimento: '01/01/2000',
      senha: '123456',
      mochila: true,
    };

    const expectedMotoboy = {
      id: '1',
      nome: 'Kleber',
      sobrenome: 'Silva',
      email: 'emailtest@example.com',
      telefone: '00000000000',
      data_de_nascimento: '01/01/2000',
      senha: '123456',
      mochila: true,
      data_de_cadastro: '01/01/2000',
      entregas_realizadas: 0,
      aiqcoins: 0,
      ativo: true,
      token_dispositivo: 'token',
      id_endereco_de_servico: null,
    };

    mockUseCase.execute.mockReturnValue(expectedMotoboy);

    const motoboy = await controller.update('1', dto);
    expect(motoboy).toEqual(expectedMotoboy);
  });
});
