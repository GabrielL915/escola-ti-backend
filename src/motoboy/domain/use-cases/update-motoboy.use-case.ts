import { Motoboy } from '../entities/motoboy.entity';
import { MotoboyRepository } from '../repository/motoboy.repository';
import { CityRepository } from 'src/city/domain/repository/city.repository';
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
    try {
      const motoboy = await this.motoboyRepository.findById(id);
      if (!motoboy) {
        throw new NotFoundException('Entregador não encontrado');
      }
      const cityExists = await this.cityRepository.findByName(input.cidade);
      if (cityExists) {
        const motoboyUpdated = {
          nome: input.nome,
          sobrenome: input.sobrenome,
          email: input.email,
          telefone: input.telefone,
          data_de_nascimento: input.data_de_nascimento,
          mochila: input.mochila,
          aiqcoins: input.aiqcoins,
          id_endereco_de_servico: cityExists.id,
        };
        const updateMotoboy = await this.motoboyRepository.update(
          id,
          motoboyUpdated,
        );
        return {
          ...updateMotoboy,
          ...cityExists,
        };
      }
      const city = await this.cityRepository.create({
        city: input.cidade,
        uf: 'PR',
      });
      const motoboyUpdated = {
        nome: input.nome,
        sobrenome: input.sobrenome,
        email: input.email,
        telefone: input.telefone,
        data_de_nascimento: input.data_de_nascimento,
        mochila: input.mochila,
        aiqcoins: input.aiqcoins,
        id_endereco_de_servico: city.id,
      };

      const updateMotoboy = await this.motoboyRepository.update(
        id,
        motoboyUpdated,
      );

      return {
        ...updateMotoboy,
        cidade: city.city,
        uf: city.uf,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Erro ao atualizar Entregador',
        error,
      );
    }
  }
}
