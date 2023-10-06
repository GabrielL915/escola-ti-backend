import { Motoboy } from '../entities/motoboy.entity';
import { MotoboyRepository } from '../repository/motoboy.repository';
import { UpdateMotoboyDto } from '../dto/update-motoboy.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
@Injectable()
export class UpdateMotoboyUseCase {
  constructor(private readonly motoboyRepository: MotoboyRepository) {}

  async update(id: string, input: UpdateMotoboyDto): Promise<Motoboy> {
    try {
      return await this.motoboyRepository.update(id, input);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Erro ao atualizar Entregador',
        error,
      );
    }
  }
}