import { Test, TestingModule } from '@nestjs/testing';
import { MotoboyModule } from '../../motoboy/resource/motoboy.module';
import { CarrinhoModule } from './carrinho.module';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nestjs-knex';
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
  ITEM_CARRINHO_CREATE_PROVIDER,
  ITEM_CARRINHO_FIND_ALL_BY_ID_PROVIDER,
  PRODUCTS_FIND_BY_ID_PROVIDER,
  STOCK_UPDATE_PROVIDER,
  STOCK_FIND_BY_ID_PROVIDER,
  MOTOBOY_UPDATE_PROVIDER,
  MOTOBOY_FIND_BY_ID_PROVIDER,
} from '../../shared/constants/injection-tokens';
import { IFindAllById } from '../../shared/interfaces/find-all-by-id.interface';
import { IFindById } from '../../shared/interfaces/find-by-id.interface';
import { StockModule } from '../../stock/resource/stock.module';
import { GenerateBearer } from '../../shared/utils/generate-bearer';
import { LoginUseCase } from '../../auth/domain/use-cases/login.use-case';
import { RegisterUseCase } from '../../auth/domain/use-cases/register.use-case';
import { AuthModule } from '../../auth/resource/auth.module';
import { hashPassword } from '../../auth/utils/hash-password';
import { MotoboyRepository } from '../../motoboy/domain/repository/motoboy.repository';
import { ProductRepository } from '../../products/domain/repository/products.repository';

describe('CarrinhoController (e2e)', () => {
  let app: INestApplication;
  let jwtToken: any;
  let generateBearer: GenerateBearer;
  let carrinhoRepo: CarrinhoRepository;
  let motoboyRepo: MotoboyRepository;
  let productsRepo: ProductRepository;
  let mockid: string;
  let productId: string;
  let carrinhoId: string;
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
    motoboyRepo = moduleFixture.get<MotoboyRepository>(MotoboyRepository);
    const registerUseCase = moduleFixture.get<RegisterUseCase>(RegisterUseCase);
    const loginUseCase = moduleFixture.get<LoginUseCase>(LoginUseCase);
    generateBearer = new GenerateBearer(loginUseCase, registerUseCase);
    jwtToken = await generateBearer.getJwtToken();
    mockid = jwtToken.id_resgister;
    productsRepo = moduleFixture.get<ProductRepository>(ProductRepository);

    await motoboyRepo.updateAiqcoins(mockid, { aiqcoins: 1000 });
    const productData = {
      nome: 'Produto 009',
      descricao: 'Descrição do produto',
      valor: 1000,
      quantidade: 20,
    };
    const response = await request(app.getHttpServer())
      .post('/products')
      .field('nome', productData.nome)
      .field('valor', productData.valor)
      .field('descricao', productData.descricao)
      .field('quantidade', productData.quantidade)
      .attach('image', 'test/assets/moscando.jpg');
    productId = response.body.id;
  }, 10000);

  afterAll(async () => {
    if (mockid) {
      await motoboyRepo.delete(mockid);
    }
    await app.close();
  });

  it('/carrinho/itens (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/carrinho/itens')
      .set('Authorization', `Bearer ${jwtToken.access_token}`);
    carrinhoId = response.body.id;
    expect(response.status).toBe(200);
  });

  it('/carrinho/add/:id (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/carrinho/add/${productId}`)
      .set('Authorization', `Bearer ${jwtToken.access_token}`)
      .send({
        quantidade: 1,
      });
    expect(response.status).toBe(200);
  });

  it('/carrinho/finish (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/carrinho/finish/${carrinhoId}`)
      .set('Authorization', `Bearer ${jwtToken.access_token}`);
    expect(response.status).toBe(200);
  });
/* 
  it('/carrinho/:id (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/carrinho/${carrinhoId}`)
      .set('Authorization', `Bearer ${jwtToken.access_token}`);
    expect(response.status).toBe(200);
  }); */
});
