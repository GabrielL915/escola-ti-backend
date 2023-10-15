import { Injectable } from '@nestjs/common';
import { StockRepository } from '../repository/stock.repository';

@Injectable()
export class DeleteStockUseCase {
  constructor(private readonly stockRepository: StockRepository) {}

  async delete(id: string): Promise<void> {
    return this.stockRepository.delete(id);
  }
}
