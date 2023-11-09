import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import superTest from 'supertest';
import { Knex } from 'knex';
import { AppModule } from '../../src/app.module';

jest.mock('knex');
let app: INestApplication;
const mockKnexInsert = jest.fn();
const mockKnexSelect = jest.fn();
const mockKnexFrom = jest.fn();
const mockKnexWhere = jest.fn();
const mockKnexUpdate = jest.fn();
const mockKnexReturning = jest.fn();

mockKnexFrom.mockReturnValue({
  select: mockKnexSelect,
  where: mockKnexWhere,
  insert: mockKnexInsert,
  update: mockKnexUpdate,
  returning: mockKnexReturning,
});
const mockKnex = {
  from: mockKnexFrom,
} as any;

describe('Auth E2E Test Suite', () => {
  beforeEach(async () => {
    mockKnexInsert.mockClear();
    mockKnexSelect.mockClear();
    mockKnexFrom.mockClear();
    mockKnexWhere.mockClear();
    mockKnexUpdate.mockClear();
    mockKnexReturning.mockClear();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(Knex)
      .useValue(mockKnex)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /auth/sendNumber should generate a code', async () => {
    return await superTest(app.getHttpServer())
      .post('/auth/sendNumber')
      .send({ telefone: '(00) 00000-0000' })
      .expect(201);
  });

/*   it('POST / should register an Motoboy and return 201', async () => {
    const motoboy = {
      nome: 'João',
      sobrenome: 'Almeida',
      email: 'joao.almeida@example.com',
      data_de_nascimento: '01/01/1990',
      mochila: true,
      cpf: '123.456.789-00',
      cnpj: '12.345.678/0001-99',
      telefone: 'teste',
      senha: 'senhaSegura123',
      cidade: 'Massaranduba',
    };

    const response = await superTest(app.getHttpServer())
      .post('/auth/register')
      .send(motoboy);

    expect(response.status).toBe(201);
  });

  it('POST / should login an Motoboy and return 201', async () => {
    const motoboy = {
      email: 'joao.almeida@example.com',
      senha: 'senhaSegura123',
    };

    const response = await superTest(app.getHttpServer())
      .post('/auth/login')
      .send(motoboy);

    expect(response.status).toBe(200);
  }); */
});
