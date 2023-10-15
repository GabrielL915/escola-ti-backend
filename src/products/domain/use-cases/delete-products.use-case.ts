import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/products.repository';
import { DeleteImagensUseCase } from '../../../imagens/domain/use-cases/delete-imagem.use-case';
import { DeleteStockUseCase } from '../../../stock/domain/use-cases/delete-stock.use-case';

@Injectable()
export class DeleteProductsUseCase {
  constructor(private readonly productRepository: ProductRepository,
    private readonly deleteImagemUsecase: DeleteImagensUseCase,
    private readonly deleteStockUseCase: DeleteStockUseCase) {}
  
  async delete(id: string) {
    await this.deleteImagemUsecase.delete(id);
    await this.deleteStockUseCase.delete(id);
    return await this.productRepository.delete(id);
  }
}
