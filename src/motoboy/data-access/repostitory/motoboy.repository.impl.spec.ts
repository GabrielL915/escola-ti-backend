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
            returning: jest.fn().mockReturnThis()
          })
        })
      };
      
      mockKnex = jest.fn().mockReturnValue(knexFunctions);
    repository = new MotoboyRepositoryImpl(mockKnex as any);
  });

  it('should throw exception if entregador not found', async () => {
    knexFunctions.where().select.mockResolvedValueOnce([]);
  
    await expect(repository.update('1', {} as Motoboy)).rejects.toThrow(
      HttpException
    );
  });

  it('should return updated motoboy if entregador exists', async () => {
    // Suponha que esse seja o entregador existente
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
      ativo: true
    };
    knexFunctions.where().select.mockResolvedValueOnce([originalMotoboy]);
    
    // Suponha que você esteja atualizando apenas os campos permitidos no DTO
    const updatedData: UpdateMotoboyDto = {
      nome: 'Carlos',
      sobrenome: 'Rodrigues',
      email: 'carlos@example.com',
      telefone: '(11) 12345-6789',
      data_de_nascimento: '01/01/1992',
      senha: 'newpassword',
      mochila: false
    };
    
    // Combine os dados originais do entregador com os dados atualizados
    const combinedData: Motoboy = { ...originalMotoboy, ...updatedData };
    
    // Após atualizar, esta é a versão atualizada do entregador
    knexFunctions.where().update().returning.mockResolvedValueOnce([combinedData]);
  
    // Atualize o entregador no repositório
    const result = await repository.update('1', combinedData);
    
    // Verifique se os campos foram atualizados corretamente
    expect(result.nome).toBe('Carlos');
    expect(result.sobrenome).toBe('Rodrigues');
    expect(result.email).toBe('carlos@example.com');
    // ... você pode continuar verificando os outros campos também
  });
  
  
});
