import { Injectable } from '@nestjs/common';
import { StockRepository } from '../repository/stock.repository';
import { IDelete } from '../../../shared/interfaces/delete.interface';
@Injectable()
export class DeleteStockUseCase implements IDelete<void>{
  constructor(private readonly stockRepository: StockRepository) {}

  async delete(id: string): Promise<void> {
    return this.stockRepository.delete(id);
  }
}
