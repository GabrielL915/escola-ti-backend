import { Injectable } from '@nestjs/common';

@Injectable()
export class FindByIdProductsUseCase {
    findById(id: string) {
        return 'This action returns a product';
    }
}