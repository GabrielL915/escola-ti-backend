import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Meta } from '../entities/meta.entity';
import { MetaRepository } from '../repository/meta.repository';
import { UpdateMetaDto } from '../dto/update-meta.dto';

@Injectable()
export class UpdateMetaUseCase {
  constructor(private readonly metaRepository: MetaRepository) {}

  async update(
    id: string,
    input: UpdateMetaDto,
  ): Promise<Meta> {
    try {
      return this.metaRepository.update(id, input);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar Meta', error);
    }
  }
}
