import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateProductDto } from '../domain/dto/create-product.dto';
import { UpdateProductDto } from '../domain/dto/update-product.dto';
import { CreateProductsUseCase } from '../domain/use-cases/create-products.use-case';
import { FindAllProductsUseCase } from '../domain/use-cases/find-all-products.use-case';
import { FindByIdProductsUseCase } from '../domain/use-cases/find-by-id-products.use-case';
import { UpdateProductsUseCase } from '../domain/use-cases/update-products.use-case';
import { DeleteProductsUseCase } from '../domain/use-cases/delete-products.use-case';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProductsUseCase: CreateProductsUseCase,
    private readonly findAllProductsUseCase: FindAllProductsUseCase,
    private readonly findByIdProductsUseCase: FindByIdProductsUseCase,
    private readonly updateProductsUseCase: UpdateProductsUseCase,
    private readonly deleteProductsUseCase: DeleteProductsUseCase,
  ) {}

  @Post()
  create(@Body() input: CreateProductDto) {
    return this.createProductsUseCase.create(input);
  }

  @Get()
  findAll() {
    return this.findAllProductsUseCase.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findByIdProductsUseCase.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() input: UpdateProductDto) {
    return this.updateProductsUseCase.update(id, input);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteProductsUseCase.delete(id);
  }
}
