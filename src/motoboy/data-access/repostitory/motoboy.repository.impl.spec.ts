import { MotoboyRepositoryImpl } from './motoboy.repository.impl';
import { Motoboy } from '../../domain/entities/motoboy.entity';
import { HttpException } from '@nestjs/common';
import { UpdateMotoboyDto } from '../../domain/dto/update-motoboy.dto';

describe('MotoboyRepositoryImpl', () => {
  let repository: MotoboyRepositoryImpl;
  let mockKnex: any;
  let knexFunctions: any;

  beforeEach(() => {
    knexFunctions = {
      where: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnThis(),
        update: jest.fn().mockReturnThis().mockReturnValue({
          returning: jest.fn().mockReturnThis(),
        }),
      }),
    };

    mockKnex = jest.fn().mockReturnValue(knexFunctions);
    repository = new MotoboyRepositoryImpl(mockKnex as any);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should throw exception if entregador not found', async () => {
    knexFunctions.where().select.mockResolvedValueOnce([]);

    await expect(repository.update('1', {} as Motoboy)).rejects.toThrow(
      HttpException,
    );
  });

  it('should return updated motoboy if entregador exists', async () => {
    const originalMotoboy: Motoboy = {
      id: '1',
      nome: 'João',
      sobrenome: 'Silva',
      CPF: '000.000.000-00',
      CNPJ: '00.000.000/0000-00',
      email: 'joao@example.com',
      telefone: '1234567890',
      data_de_nascimento: '01/01/1990',
      senha: 'password',
      data_de_cadastro: '01/01/2020',
      mochila: true,
      aiqcoins: 100,
      ativo: true,
    };
    knexFunctions.where().select.mockResolvedValueOnce([originalMotoboy]);

    const updatedData: UpdateMotoboyDto = {
      nome: 'Kleber',
      sobrenome: 'Silva',
      email: 'emailtest@example.com',
      telefone: '00000000000',
      data_de_nascimento: '01/01/2000',
      senha: '12345678',
      mochila: true,
    };

    const combinedData: Motoboy = { ...originalMotoboy, ...updatedData };

    knexFunctions
      .where()
      .update()
      .returning.mockResolvedValueOnce([combinedData]);

    const result = await repository.update('1', combinedData);

    expect(result.nome).toBe('Kleber');
    expect(result.sobrenome).toBe('Silva');
    expect(result.email).toBe('emailtest@example.com');
    expect(result.telefone).toBe('00000000000');
    expect(result.data_de_nascimento).toBe('01/01/2000');
    expect(result.mochila).toBe(true);
  });

  it('should throw an HttpException with a 404 status code when the motoboy with the given id does not exist', async () => {
    knexFunctions.where().select.mockResolvedValueOnce([]);

    await expect(repository.update('1', {} as Motoboy)).rejects.toThrow(
      new HttpException('Entregador not found', 404),
    );
  });
});
