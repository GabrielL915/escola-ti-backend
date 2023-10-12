import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class UpdateProductsUseCase {
  update(id: string, input: UpdateProductDto) {
    return 'This action updates a product';
  }
}
