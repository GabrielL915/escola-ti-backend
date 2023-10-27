import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nestjs-knex';
import { MotoboyModule } from './motoboy.module';
import { MotoboyController } from './motoboy.controller';
import { CreateMotoboyUseCase } from '../domain/use-cases/create-motoboy.use-case';
import { FindAllMotoboyUseCase } from '../domain/use-cases/find-all-motoboy.use-case';
import { FindByIdMotoboyUseCase } from '../domain/use-cases/find-by-id-motoboy.use-case';
import { FindByEmailMotoboyUseCase } from '../domain/use-cases/find-by-email-motoboy.use-case';
import { UpdateMotoboyUseCase } from '../domain/use-cases/update-motoboy.use-case';
import { UpdateMotoboyAiqcoinsUseCase } from '../domain/use-cases/update-motoboy-aiqcoins.use-case';
import { DeleteMotoboyUseCase } from '../domain/use-cases/delete-motoboy.use-case';
import { MotoboyRepository } from '../domain/repository/motoboy.repository';
import { MotoboyRepositoryImpl } from '../data-access/infraestructure/repostitory/motoboy.repository.impl';
import {
  MOTOBOY_UPDATE_PROVIDER,
  MOTOBOY_FIND_BY_ID_PROVIDER,
} from '../../shared/constants/injection-tokens';

enum UserInfoFields {
  cnpj = '00000000000100',
  cpf = '00000000000',
  nome = 'User0003',
  sobrenome = 'Sobrenome0003',
  email = 'userSobrenome0003@gmail.com',
  telefone = '00000000000',
  token_dispositivo = "token_dispositivo",
  data_de_nascimento = '05/09/2023',
  senha = 'senha123',
  mochila = 'true',
  cidade = 'Maringa',
}



describe('MotoboyController (e2e)', () => {
  let app: INestApplication;
  let mockemail: string; 
  let mocksenha: string;
  let mockid: string;
  let motoboyRepo: MotoboyRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MotoboyModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
        }),
        KnexModule.forRoot({
          config: {
            client: 'postgresql',
            useNullAsDefault: true,
            connection: {
              connectionString: process.env.CONNECTION_STRING,
              ssl: { rejectUnauthorized: false },
              host: process.env.HOST,
              port: 5432,
              user: process.env.USER,
              database: process.env.DATABASE,
              password: process.env.PASSWORD,
            },
          },
        }),
      ],
      controllers: [MotoboyController],
      providers: [
        CreateMotoboyUseCase,
        FindAllMotoboyUseCase,
        FindByIdMotoboyUseCase,
        FindByEmailMotoboyUseCase,
        UpdateMotoboyUseCase,
        UpdateMotoboyAiqcoinsUseCase,
        DeleteMotoboyUseCase,
        {
          provide: MotoboyRepository,
          useClass: MotoboyRepositoryImpl,
        },
        {
          provide: MOTOBOY_UPDATE_PROVIDER,
          useClass: UpdateMotoboyAiqcoinsUseCase,
        },
        {
          provide: MOTOBOY_FIND_BY_ID_PROVIDER,
          useClass: FindByIdMotoboyUseCase,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    motoboyRepo = moduleFixture.get<MotoboyRepository>(MotoboyRepository);
  });

  afterAll(async () => {
    if (mockid) {
      await motoboyRepo.delete(mockid);
    }
    await app.close();
  });

  it('/motoboy (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/motoboy')
      .send({
        cnpj: UserInfoFields.cnpj,
        cpf: UserInfoFields.cpf,
        nome: UserInfoFields.nome,
        sobrenome: UserInfoFields.sobrenome,
        email: UserInfoFields.email,
        data_de_nascimento: UserInfoFields.data_de_nascimento,
        telefone: UserInfoFields.telefone,
        senha: UserInfoFields.senha,
        token_dispositivo: UserInfoFields.token_dispositivo,
        mochila: true,
        cidade: UserInfoFields.cidade,
      });
      mockemail = response.body.email;
      mocksenha = response.body.senha;
      mockid = response.body.id;
      expect(response.status).toBe(201);
  });


});
