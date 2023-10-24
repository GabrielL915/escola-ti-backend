import { Motoboy } from '../entities/motoboy.entity';
import { MotoboyRepository } from '../repository/motoboy.repository';
import { CityRepository } from '../../../city/domain/repository/city.repository';
import { UpdateMotoboyRequestDto } from '../dto/update-motoboy-request.dto';
import { IUpdate } from '../../../shared/interfaces/update.interface';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
@Injectable()
export class UpdateMotoboyUseCase {
  constructor(
    private readonly motoboyRepository: MotoboyRepository,
    private readonly cityRepository: CityRepository,
  ) {}

  async update(id: string, input: UpdateMotoboyRequestDto): Promise<any> {
    let id_endereco_de_servico = null;
    try {
      const motoboy = await this.motoboyRepository.findById(id);
      if (!motoboy) {
        throw new NotFoundException('Entregador não encontrado');
      }

      if (input.cidade) {
        const cityExists = await this.cityRepository.findByName(input.cidade);
        if (cityExists) {
          id_endereco_de_servico = cityExists.id;
        }
      }

      const motoboyUpdated: any = {
        nome: input.nome,
        sobrenome: input.sobrenome,
        email: input.email,
        telefone: input.telefone,
        data_de_nascimento: input.data_de_nascimento,
        mochila: input.mochila,
        aiqcoins: input.aiqcoins,
      };

      if (id_endereco_de_servico) {
        motoboyUpdated.id_endereco_de_servico = id_endereco_de_servico;
      }

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
