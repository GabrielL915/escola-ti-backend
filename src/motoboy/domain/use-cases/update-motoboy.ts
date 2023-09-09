import { Injectable } from '@nestjs/common';
import { Motoboy } from '../entities/motoboy.entity';
import { MotoboyRepository } from '../repository/motoboy.repository';
import { UpdateMotoboyDto } from '../dto/update-motoboy.dto';

@Injectable()
export class UpdateMotoboyUseCase {
    constructor(private readonly motoboyRepository: MotoboyRepository) {}

    async execute({ id, input }: { id: string; input: UpdateMotoboyDto }): Promise<Motoboy> {
        return await this.motoboyRepository.update(id, input);
    }
}