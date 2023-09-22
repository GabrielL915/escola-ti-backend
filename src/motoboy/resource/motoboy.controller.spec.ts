import { Test, TestingModule } from '@nestjs/testing';
import { MotoboyController } from './motoboy.controller';
import { CreateMotoboyUseCase } from '../domain/use-cases/create-motoboy.use-case';
import { FindAllMotoboyUseCase } from '../domain/use-cases/find-all-motoboy.use-case';
import { FindByIdMotoboyUseCase } from '../domain/use-cases/find-by-id-motoboy.use-case';
import { UpdateMotoboyUseCase } from '../domain/use-cases/update-motoboy.use-case';
import { CreateMotoboyDto } from '../domain/dto/create-motoboy.dto';
import { UpdateMotoboyDto } from '../domain/dto/update-motoboy.dto';

const mockCreateMotoboyUseCase = {
  create: jest.fn(),
};

const mockFindAllMotoboyUseCase = {
  findAll: jest.fn(),
};

const mockFindByIdMotoboyUseCase = {
  findById: jest.fn(),
};

const mockUpdateMotoboyUseCase = {
  update: jest.fn(),
};

const mockCreateDto: CreateMotoboyDto = {
    cnpj: "00.000.000/0000-00",
    cpf: "111.111.111-11",
    nome: "Entregador7",
    sobrenome: "Sobrenome4",
    email: "teste@gmail.com",
    data_de_nascimento: "05/09/2023",
    senha: "senha123",
    mochila: false,
    telefone: "(44) 99999-9999",
    id_endereco_de_servico: "00000000-0000-0000-0000-000000000000"
}

describe('MotoboyController', () => {
  let controller: MotoboyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotoboyController],
      providers: [
        {
          provide: CreateMotoboyUseCase,
          useValue: mockCreateMotoboyUseCase,
        },
        {
          provide: FindAllMotoboyUseCase,
          useValue: mockFindAllMotoboyUseCase,
        },
        {
          provide: FindByIdMotoboyUseCase,
          useValue: mockFindByIdMotoboyUseCase,
        },
        {
          provide: UpdateMotoboyUseCase,
          useValue: mockUpdateMotoboyUseCase,
        },
      ],
    }).compile();

    controller = module.get<MotoboyController>(MotoboyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call create with correct params and return the result', async () => {
      const createDto: CreateMotoboyDto = {
        ...mockCreateDto,
      };
      mockCreateMotoboyUseCase.create.mockResolvedValueOnce(mockCreateDto);

      const result = await controller.create(createDto);

      expect(mockCreateMotoboyUseCase.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockCreateDto);
    });
  });

  describe('findAll', () => {
    it('should call findAll with correct params and return the result', async () => {
      const result = await controller.findAll();

      expect(mockFindAllMotoboyUseCase.findAll).toHaveBeenCalledWith();
      expect(result).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should call findById with correct params and return the result', async () => {
      const id = '1';
      const result = await controller.findOne(id);

      expect(mockFindByIdMotoboyUseCase.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual(result);
    });
  });

  describe('update', () => {
    it('should call update with correct params and return the result', async () => {
      const updateDto: UpdateMotoboyDto = {
        ...mockCreateDto,
      };
      const id = '1';
      const result = await controller.update(id, updateDto);

      expect(mockUpdateMotoboyUseCase.update).toHaveBeenCalledWith({
        id,
        input: updateDto,
      });
      expect(result).toEqual(result);
    });
  });

});
