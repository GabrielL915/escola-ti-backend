import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Meta } from '../entities/meta.entity';
import { MetaRepository } from '../repository/meta.repository';
import { ObjectiveRepository } from 'src/objetivo/domain/repository/objective.repository';
import { UpdateMetaDto } from '../dto/update-meta.dto';

@Injectable()
export class UpdateMetaUseCase {
  constructor(
    private readonly metaRepository: MetaRepository,
    private readonly objectiveRepository: ObjectiveRepository,
  ) {}

  async update(id: string, input: UpdateMetaDto): Promise<Meta> {
    try {
      const objetivo = await this.objectiveRepository.findOne(id);

      // Calcula a porcentagem de progresso
      const porcentagemProgresso = (input.valor_atingido / objetivo.meta) * 100;

      // Atualiza o valor em porcentagem (assumindo que você tem um campo valor_atingido_porcentagem)
      input.valor_atingido = porcentagemProgresso;

      return await this.metaRepository.update(id, input);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar Meta', error);
    }
  }
}
