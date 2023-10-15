import { Injectable } from '@nestjs/common';
import { Stock } from '../entities/stock.entity';
import { StockRepository } from '../repository/stock.repository';

@Injectable()
export class FindByIdStockUseCase {
  constructor(private readonly stockRepository: StockRepository) {}

  async findById(id: string): Promise<Stock> {
    return this.stockRepository.findById(id);
  }
}
