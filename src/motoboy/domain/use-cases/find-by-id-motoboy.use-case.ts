import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Motoboy } from '../entities/motoboy.entity';
import { MotoboyRepository } from '../repository/motoboy.repository';

@Injectable()
export class FindByIdMotoboyUseCase {
  constructor(private readonly motoboyRepository: MotoboyRepository) {}

  async findById(id: string): Promise<Motoboy> {
    try {
      return await this.motoboyRepository.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar Entregador pro Id',
        error,
      );
    }
  }
}
