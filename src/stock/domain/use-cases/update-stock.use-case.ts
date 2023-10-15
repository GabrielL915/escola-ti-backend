import { Injectable } from '@nestjs/common';
import { Stock } from '../entities/stock.entity';
import { UpdateStockDto } from '../dto/update-stock.dto';
import { StockRepository } from '../repository/stock.repository';

@Injectable()
export class UpdateStockUseCase {
  constructor(private readonly stockRepository: StockRepository) {}

  async update(id: string, input: UpdateStockDto): Promise<Stock> {
    return this.stockRepository.update(id, input);
  }
}
