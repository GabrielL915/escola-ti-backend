import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllProductsUseCase {
    findAll() {
        return 'This action returns all products';
    }
}
