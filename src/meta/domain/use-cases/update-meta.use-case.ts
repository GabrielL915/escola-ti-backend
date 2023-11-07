import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Meta } from '../entities/meta.entity';
import { MetaRepository } from '../repository/meta.repository';
import { ObjectiveRepository } from '../../../objetivo/domain/repository/objective.repository';
import { UpdateMetaDto } from '../dto/update-meta.dto';

@Injectable()
export class UpdateMetaUseCase {
  constructor(
    private readonly metaRepository: MetaRepository,
    private readonly objectiveRepository: ObjectiveRepository,
  ) { }

  async update(
    idObjetivo: string,
    idInscrito: string,
    input: UpdateMetaDto,
  ): Promise<Meta> {
    try {
      const objetivo = await this.objectiveRepository.findOne(idObjetivo);

      const porcentagemProgresso = (input.valor_atingido / objetivo.meta) * 100;

      input.valor_atingido = porcentagemProgresso;

      const response = await this.metaRepository.update(idObjetivo, idInscrito, input);
      return response;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Erro ao atualizar Meta', error);
    }
  }
}
