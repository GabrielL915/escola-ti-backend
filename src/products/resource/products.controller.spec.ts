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
import { ImagensModule } from '../../imagens/resource/imagens.module';
import { StockModule } from '../../stock/resource/stock.module';
import {
  IMAGEN_CREATE_PROVIDER,
  IMAGEN_DELETE_PROVIDER,
  IMAGEN_FIND_BY_ID_PROVIDER,
  IMAGEN_UPDATE_PROVIDER,
  STOCK_CREATE_PROVIDER,
  STOCK_DELETE_PROVIDER,
  STOCK_FIND_BY_ID_PROVIDER,
  STOCK_UPDATE_PROVIDER,
} from '../../shared/constants/injection-tokens';
import { CreateImagenUseCase } from '../../imagens/domain/use-cases/create-imagem.use-case';
import { CreateStockUseCase } from '../../stock/domain/use-cases/create-stock.use-case';
import { ImagemRepository } from '../../imagens/domain/repository/imagem.repository';
import { ImagemRepositoryImpl } from '../../imagens/data-access/infraestructure/repository/imagem.repository.impl';
import { StockRepository } from '../../stock/domain/repository/stock.repository';
import { StockRepositoryImpl } from '../../stock/data-access/infraestructure/repository/stock.repository.impl';
import { FindByIdStockUseCase } from '../../stock/domain/use-cases/find-by-id-stock.use-case';
import { FindByIdImagemUseCase } from '../../imagens/domain/use-cases/find-by-id-imagem.use-case';
import { DeleteImagensUseCase } from '../../imagens/domain/use-cases/delete-imagem.use-case';
import { DeleteStockUseCase } from '../../stock/domain/use-cases/delete-stock.use-case';
import { UpdateImagemUseCase } from '../../imagens/domain/use-cases/update-imagem.use-case';
import { UpdateStockUseCase } from '../../stock/domain/use-cases/update-stock.use-case';

describe('ProductsController (e2e)', () => {
  let app: INestApplication;
  let id_

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ProductsModule,
        CloudinaryModule,
        ImagensModule,
        StockModule,
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
        {
          provide: ImagemRepository,
          useClass: ImagemRepositoryImpl,
        },
        {
          provide: StockRepository,
          useClass: StockRepositoryImpl,
        },
        {
          provide: IMAGEN_CREATE_PROVIDER,
          useClass: CreateImagenUseCase,
        },
        {
          provide: STOCK_CREATE_PROVIDER,
          useClass: CreateStockUseCase,
        },
        {
          provide: STOCK_FIND_BY_ID_PROVIDER,
          useClass: FindByIdStockUseCase,
        },
        {
          provide: IMAGEN_FIND_BY_ID_PROVIDER,
          useClass: FindByIdImagemUseCase,
        },
        {
          provide: IMAGEN_DELETE_PROVIDER,
          useClass: DeleteImagensUseCase,
        },
        {
          provide: STOCK_DELETE_PROVIDER,
          useClass: DeleteStockUseCase,
        },
        {
          provide: IMAGEN_UPDATE_PROVIDER,
          useClass: UpdateImagemUseCase,
        },
        {
          provide: STOCK_UPDATE_PROVIDER,
          useClass: UpdateStockUseCase,
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
      nome: 'Produto 009',
      descricao: 'Descrição do produto',
      valor: 1000,
      quantidade: 20,
    };

    const response = await request(app.getHttpServer())
      .post('/products')
      .field('nome', createProductDto.nome)
      .field('valor', createProductDto.valor)
      .field('descricao', createProductDto.descricao)
      .field('quantidade', createProductDto.quantidade)
      .attach('image', 'test/assets/moscando.jpg');

    expect(response.status).toBe(201);
    console.log(response.body);
  });

  it('should find all products', async () => {
    const response = await request(app.getHttpServer()).get('/products');

    expect(response.status).toBe(200);
    console.log(response.body);
  });

  it('should find a product by id', async () => {
    const response = await request(app.getHttpServer()).get(
      '/products/2f5ef218-063a-4b5e-b695-3fe97071c706',
    );
    console.log(response.body);
    expect(response.status).toBe(200);
  });

  it('should update a product', async () => {
    const updateProductDto = {
      nome: 'atualizado',
      descricao: 'descricao atualizada',
      valor: 1000,
      quantidade: 0,
      status: false,
    };

    const response = await request(app.getHttpServer())
      .patch('/products/396dc7c9-e599-49b0-a1b9-30dbad3e211c')
      .field('nome', updateProductDto.nome)
      .field('valor', updateProductDto.valor)
      .field('descricao', updateProductDto.descricao)
      .field('quantidade', updateProductDto.quantidade)
      .field('status', updateProductDto.status)
      .attach('image', 'test/assets/moscando.jpg');
      console.log(response.body);
    expect(response.status).toBe(200);

  });

  it('should delete a product', async () => {
    const response = await request(app.getHttpServer()).delete(
      '/products/c8fe1f8c-b50f-4374-80cc-369c5d5b5334',
    );

    expect(response.status).toBe(200);
  });
});
