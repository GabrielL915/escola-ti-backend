import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Meta } from '../entities/meta.entity';
import { MetaRepository } from '../repository/meta.repository';

@Injectable()
export class FindMetaUseCase {
  constructor(private readonly metaRepository: MetaRepository) {}

  async findAll(): Promise<Meta[]> {
    try {
      return await this.metaRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar Metas', error);
    }
  }

  async findOne(id: string): Promise<Meta> {
    try {
      return await this.metaRepository.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar Meta por id', error);
    }
  }
}
