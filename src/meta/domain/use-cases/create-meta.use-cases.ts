import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Meta } from '../entities/meta.entity';
import { MetaRepository } from '../repository/meta.repository';
import { CreateMetaDto } from '../dto/create-meta.dto';

@Injectable()
export class CreateMetaUseCase {
  constructor(private readonly metaRepository: MetaRepository) {}

  async create(input: CreateMetaDto): Promise<Meta> {
    try {
      return await this.metaRepository.create(input);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar Meta', error);
    }
  }
}
