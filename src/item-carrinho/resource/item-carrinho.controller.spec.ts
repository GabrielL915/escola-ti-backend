/* import { Test, TestingModule } from '@nestjs/testing';
import { ItemCarrinhoController } from './item-carrinho.controller';
import { CreateItemCarrinhoDto } from '../domain/dto/create-item-carrinho.dto';
import { CreateItemCarrinhoUseCase } from '../domain/use-cases/create-item-carrinho.use-case';
import { FindAllByIdItensCarrinhoUseCase } from '../domain/use-cases/find-all-by-id-itens-carrinho.use-case';
import { ItemCarrinhoRepository } from '../domain/repository/item-carrinho.repository';
import { ItemCarrinhoRepositoryImpl } from '../data-access/infraestructure/repository/item-carrinho.repository.impl';
import {
  ITEM_CARRINHO_CREATE_PROVIDER,
  ITEM_CARRINHO_FIND_ALL_BY_ID_PROVIDER,
} from '../../shared/constants/injection-tokens';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nestjs-knex';
import { ItemCarrinhoModule } from './item-carrinho.module';

enum ItemCarrnhoInfoFields {

}

describe('ItemCarrinhoController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ItemCarrinhoModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
        }),
        KnexModule.forRoot({
          config: {
            client: 'mysql',
            connection: {
              host: process.env.DATABASE_HOST,
              port: parseInt(process.env.DATABASE_PORT),
              user: process.env.DATABASE_USER,
              password: process.env.DATABASE_PASSWORD,
              database: process.env.DATABASE_NAME,
            },
          },
        }),
      ],
      controllers: [ItemCarrinhoController],
      providers: [
        CreateItemCarrinhoUseCase,
        FindAllByIdItensCarrinhoUseCase,
        {
          provide: ItemCarrinhoRepository,
          useClass: ItemCarrinhoRepositoryImpl,
        },
        {
          provide: ITEM_CARRINHO_CREATE_PROVIDER,
          useClass: CreateItemCarrinhoUseCase,
        },
        {
          provide: ITEM_CARRINHO_FIND_ALL_BY_ID_PROVIDER,
          useClass: FindAllByIdItensCarrinhoUseCase,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });


  it('should create a item carrinho', async () => {

  });
});
 */