import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class CreateProductsUseCase {
    create(input: CreateProductDto) {
        return 'This action adds a new product';
    }
}