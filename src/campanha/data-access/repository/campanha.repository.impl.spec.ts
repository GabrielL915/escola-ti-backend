import { CampanhaRepositoryImpl } from './campanha.repository.impl';
describe('CaampanhaRepositoryImpl', () => {
  let repository: CampanhaRepositoryImpl;
  let mockKnex: any;
  let knexFunctions: any;

  beforeEach(() => {
    knexFunctions = {
      insert: jest.fn().mockReturnValue([]),
      select: jest.fn().mockReturnValue([]),
    };

    mockKnex = jest.fn().mockReturnValue(knexFunctions);
    repository = new CampanhaRepositoryImpl(mockKnex as any);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should add a book to the list of books', async () => {
      const campanha = {
        tipo: 'Semana das Massas',
        dias: [
          'Segunda',
          'Terça',
          'Quarta',
          'Quinta',
          'Sexta',
          'Sábado',
          'Domingo',
        ],
        horario: '2023-09-14T00:42:22',
        limite_corridas_ignoradas: 10,
        limite_corridas_recusadas: 10,
        tempo_de_tolerancia: '2023-09-14T00:42:22',
        periodo: '2023-09-14T00:42:22',
        descricao: 'Faça entregas de massas e ganhe mais',
        ativa: true,
      };
      await repository.create(campanha);
      const campanhas = await repository.findAll();
      expect(campanhas).toHaveLength(1);
      expect(campanhas[0]).toEqual(campanha);
    });
  });

  describe('findAll', () => {
    it('should return all books', async () => {
      const campanhas = await repository.findAll();
      expect(campanhas).toHaveLength(1);
    });
  });
});
