// campanha.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { CampanhaService } from './campanha.service';
import { mock } from 'node:test';

describe('CampanhaService', () => {
  let service: CampanhaService;
  let knexFunctions: any;

  beforeEach(async () => {
    knexFunctions = {
      where: jest.fn().mockReturnThis({
        select: jest.fn().mockReturnThis(),
        update: jest.fn().mockReturnThis().mockResolvedValue({
          returning: jest.fn().mockReturnThis(),
        }),
      }),
    };

    mockKnex = jest.fn().mockReturnValue(knexFunctions);
    reposiroty = new CampanhaRepository(mockKnex as any);
    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [CampanhaService, { provide: 'Campanha', useValue: {} }],
    }).compile();

    service = module.get<CampanhaService>(CampanhaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new campanha', async () => {
      const createDto = {
        id: 1,
        tipo: 'Semana das Massas',
        dias: ['Segunda', 'Terça', 'Quarta'],
        horario: '08:00',
        limite_corridas_ignoradas: 10,
        limite_corridas_recusadas: 5,
        tempo_de_tolerancia: 15,
        periodo: 'Tarde',
        descricao: 'Faça entregas de massas e ganhe mais',
        ativa: true,
      };
      const createdCampanha = await service.create(createDto);
      expect(createdCampanha).toBeDefined();
      expect(createdCampanha.tipo).toEqual(createDto.tipo);
      expect(createdCampanha.dias).toEqual(createDto.dias);
      expect(createdCampanha.horario).toEqual(createDto.horario);
      expect(createdCampanha.limite_corridas_ignoradas).toEqual(
        createDto.limite_corridas_ignoradas,
      );
      expect(createdCampanha.limite_corridas_recusadas).toEqual(
        createDto.limite_corridas_recusadas,
      );
      expect(createdCampanha.tempo_de_tolerancia).toEqual(
        createDto.tempo_de_tolerancia,
      );
      expect(createdCampanha.periodo).toEqual(createDto.periodo);
      expect(createdCampanha.descricao).toEqual(createDto.descricao);
      expect(createdCampanha.ativa).toEqual(createDto.ativa);
    });
  });
});
