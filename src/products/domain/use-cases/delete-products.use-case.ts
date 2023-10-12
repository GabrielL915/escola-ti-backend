import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteProductsUseCase {
    delete(id: string) {
        return 'This action removes a product';
    }
}