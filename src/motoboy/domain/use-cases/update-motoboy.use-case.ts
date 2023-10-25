import { Motoboy } from '../entities/motoboy.entity';
import { MotoboyRepository } from '../repository/motoboy.repository';
import { UpdateMotoboyRequestDto } from '../dto/update-motoboy-request.dto';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UpdateMotoboyUseCase {
  constructor(
    private readonly motoboyRepository: MotoboyRepository,
  ) {}

  async update(id: string, input: UpdateMotoboyRequestDto): Promise<any> {
    try {
      const motoboy = await this.motoboyRepository.findById(id);
      if (!motoboy) {
        throw new NotFoundException('Entregador não encontrado');
      }

      const motoboyUpdated: any = {
        nome: input.nome,
        sobrenome: input.sobrenome,
        email: input.email,
        telefone: input.telefone,
        data_de_nascimento: input.data_de_nascimento,
        mochila: input.mochila,
        aiqcoins: input.aiqcoins,
        cidade: input.cidade  // A cidade é diretamente atribuída aqui
      };

      const updateMotoboy = await this.motoboyRepository.update(
        id,
        motoboyUpdated,
      );

      return updateMotoboy;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Erro ao atualizar Entregador',
        error,
      );
    }
  }
}
