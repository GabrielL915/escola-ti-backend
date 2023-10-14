import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { CreateProductsUseCase } from '../domain/use-cases/create-products.use-case';
import { ProductRepository } from '../domain/repository/products.repository';
import { CloudinaryModule } from '../../cloudinary/resource/cloudinary.module';
import { CloudinaryUseCase } from '../../cloudinary/domain/use-cases/cloudinary.use-case';
import { CloudinaryProvider } from '../../cloudinary/data-access/infraestructure/storage/cloudinary.provider';
import { ICloudinaryProvider } from '../../cloudinary/domain/interfaces/icloudinary.provider';
import { ProductRepositoryImpl } from '../data-access/infraestructure/repository/products.repository.impl';
import { ProductsModule } from './products.module';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nestjs-knex';
import { UpdateProductsUseCase } from '../domain/use-cases/update-products.use-case';
import { DeleteProductsUseCase } from '../domain/use-cases/delete-products.use-case';
import { FindAllProductsUseCase } from '../domain/use-cases/find-all-products.use-case';
import { FindByIdProductsUseCase } from '../domain/use-cases/find-by-id-products.use-case';

describe('ProductsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ProductsModule,
        CloudinaryModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env'
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
      controllers: [ProductsController],
      providers: [
        CreateProductsUseCase,
        UpdateProductsUseCase,
        DeleteProductsUseCase,
        FindAllProductsUseCase,
        FindByIdProductsUseCase,
        CloudinaryUseCase,
        {
          provide: ProductRepository,
          useClass: ProductRepositoryImpl,
        },
        {
          provide: ICloudinaryProvider,
          useClass: CloudinaryProvider,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a product', async () => {
    const createProductDto = {
      nome: 'Produto 1',
      descricao: 'Descrição do produto',
      valor: 100,
    };

    const response = await request(app.getHttpServer())
      .post('/products')
      .field('nome', createProductDto.nome)
      .field('valor', createProductDto.valor)
      .field('descricao', createProductDto.descricao)
      .attach('image', 'test/assets/moscando.jpg');

    expect(response.status).toBe(201);
    console.log(response.body);
  });
});
