import { Motoboy } from '../entities/motoboy.entity';
import { MotoboyRepository } from '../repository/motoboy.repository';
import { UpdateMotoboyRequestDto } from '../dto/update-motoboy-request.dto';
import { IUpdate } from '../../../shared/interfaces/update.interface';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
@Injectable()
export class UpdateMotoboyAiqcoinsUseCase
  implements IUpdate<any, Motoboy>
{
  constructor(private readonly motoboyRepository: MotoboyRepository) {}

  async update(id: string, input: any): Promise<Motoboy> {
    try {
      const motoboy = await this.motoboyRepository.findById(id);
      if (!motoboy) {
        throw new NotFoundException('Entregador não encontrado');
      }
      const updateMotoboy = await this.motoboyRepository.updateAiqcoins(id, input);

      return updateMotoboy;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Erro ao atualizar AiQCoins do entregador',
        error,
      );
    }
  }
}
