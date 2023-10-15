import { Injectable } from '@nestjs/common';
import { CreateStockDto } from '../dto/create-stock.dto';
import { Stock } from '../entities/stock.entity';
import { StockRepository } from '../repository/stock.repository';

@Injectable()
export class CreateStockUseCase {
  constructor(private readonly stockRepository: StockRepository) {}

  async create(input: CreateStockDto): Promise<Stock> {
    return this.stockRepository.create(input);
  }
}