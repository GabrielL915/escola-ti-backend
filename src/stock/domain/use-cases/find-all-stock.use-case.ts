import { Injectable } from '@nestjs/common';
import { Stock } from '../entities/stock.entity';
import { StockRepository } from '../repository/stock.repository';

@Injectable()
export class FindAllStockUseCase {
  constructor(private readonly stockRepository: StockRepository) {}

  async findAll(): Promise<Stock[]> {
    return this.stockRepository.findAll();
  }
}
