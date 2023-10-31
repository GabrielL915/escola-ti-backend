import { Test, TestingModule } from '@nestjs/testing';
import { CarrinhoController } from './carrinho.controller';
import { CreateCarrinhoUseCase } from '../domain/use-cases/create-carrinho.use-case';
import { AddCarrinhoUseCase } from '../domain/use-cases/add-carrinho.use-case';
import { FindItensCarrinhoUseCase } from '../domain/use-cases/find-item-by-id-carrinho.use-case';
import { FinishCompraCarrinhoUseCase } from '../domain/use-cases/finish-compra-carrinho.use-case';
import { DeleteCarrinhoUseCase } from '../domain/use-cases/delete-carrinho.use-case';
import { CarrinhoRepositoryImpl } from '../data-access/infraestructure/repository/carrinho.repository.impl';
import { CarrinhoRepository } from '../domain/repository/carrinho.repository';
import { ProductsModule } from '../../products/resource/products.module';
import { ItemCarrinhoModule } from '../../item-carrinho/resource/item-carrinho.module';
import {
  CARRINHO_FIND_ITENS_BY_ID_PROVIDER,
  STOCK_UPDATE_PROVIDER,
  STOCK_FIND_BY_ID_PROVIDER,
  MOTOBOY_UPDATE_PROVIDER,
  MOTOBOY_FIND_BY_ID_PROVIDER,
} from '../../shared/constants/injection-tokens';
import { StockModule } from '../../stock/resource/stock.module';
import { MotoboyModule } from '../../motoboy/resource/motoboy.module';
import { CarrinhoModule } from './carrinho.module';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nestjs-knex';
import { GenerateBearer } from '../../shared/utils/generate-bearer';
import { LoginUseCase } from '../../auth/domain/use-cases/login.use-case';
import { RegisterUseCase } from '../../auth/domain/use-cases/register.use-case';
import { AuthModule } from '../../auth/resource/auth.module';
import { hashPassword } from '../../auth/utils/hash-password';

describe('CarrinhoController (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let generateBearer: GenerateBearer;
  let carrinhoRepo: CarrinhoRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CarrinhoModule,
        ProductsModule,
        ItemCarrinhoModule,
        StockModule,
        MotoboyModule,
        AuthModule,
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
      controllers: [CarrinhoController],
      providers: [
        CreateCarrinhoUseCase,
        AddCarrinhoUseCase,
        FinishCompraCarrinhoUseCase,
        DeleteCarrinhoUseCase,
        FindItensCarrinhoUseCase,
        {
          provide: CarrinhoRepository,
          useClass: CarrinhoRepositoryImpl,
        },
        {
          provide: CARRINHO_FIND_ITENS_BY_ID_PROVIDER,
          useClass: FindItensCarrinhoUseCase,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    carrinhoRepo = moduleFixture.get<CarrinhoRepository>(CarrinhoRepository);
    const registerUseCase = moduleFixture.get<RegisterUseCase>(RegisterUseCase);
    const loginUseCase = moduleFixture.get<LoginUseCase>(LoginUseCase);
    generateBearer = new GenerateBearer(loginUseCase, registerUseCase);
    jwtToken = await generateBearer.getJwtToken();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/carrinho/itens (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/carrinho/itens')
      .set('Authorization', `Bearer ${jwtToken}`);

    expect(response.status).toBe(200);
  });
});
