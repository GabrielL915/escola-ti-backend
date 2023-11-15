import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { CreateProductsUseCase } from '../domain/use-cases/create-products.use-case';
import { UpdateProductsUseCase } from '../domain/use-cases/update-products.use-case';
import { DeleteProductsUseCase } from '../domain/use-cases/delete-products.use-case';
import { FindAllProductsUseCase } from '../domain/use-cases/find-all-products.use-case';
import { FindByIdProductsUseCase } from '../domain/use-cases/find-by-id-products.use-case';
import { ProductRepositoryImpl } from '../data-access/infraestructure/repository/products.repository.impl';
import { ProductRepository } from '../domain/repository/products.repository';
import { CloudinaryModule } from '../../cloudinary/resource/cloudinary.module';
import { ImagensModule } from '../../imagens/resource/imagens.module';
import { StockModule } from '../../stock/resource/stock.module';
import { PRODUCTS_FIND_BY_ID_PROVIDER } from '../../shared/constants/injection-tokens';

@Module({
  imports: [CloudinaryModule, ImagensModule, StockModule],
  controllers: [ProductsController],
  providers: [
    CreateProductsUseCase,
    UpdateProductsUseCase,
    DeleteProductsUseCase,
    FindAllProductsUseCase,
    FindByIdProductsUseCase,
    {
      provide: ProductRepository,
      useClass: ProductRepositoryImpl,
    },
    {
      provide: PRODUCTS_FIND_BY_ID_PROVIDER,
      useClass: FindByIdProductsUseCase,
    },
  ],
  exports: [FindByIdProductsUseCase, PRODUCTS_FIND_BY_ID_PROVIDER, ProductRepository],
})
export class ProductsModule {}
