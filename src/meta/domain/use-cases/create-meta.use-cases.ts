import { Injectable } from '@nestjs/common';
import { Meta } from '../entities/meta.entity';
import { MetaRepository } from '../repository/meta.repository';
import { CreateMetaDto } from '../dto/create-meta.dto';

@Injectable()
export class CreateMetaUseCase {
  constructor(private readonly metaRepository: MetaRepository) {}

  async create(createMetaDto: CreateMetaDto): Promise<Meta> {
    try {
      return this.metaRepository.create(createMetaDto);
    } catch (error) {
      throw new Error(error);
    }
  }
}
