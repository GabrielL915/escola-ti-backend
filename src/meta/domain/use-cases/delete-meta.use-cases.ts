import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MetaRepository } from '../repository/meta.repository';

@Injectable()
export class DeleteMetaUseCase {
  constructor(private readonly metaRepository: MetaRepository) {}

  async delete(id: string): Promise<void> {
    try {
      return this.metaRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao deletar Meta', error);
    }
  }
}