import { Injectable } from '@nestjs/common';
import { Meta } from '../entities/meta.entity';
import { MetaRepository } from '../repository/meta.repository';

@Injectable()
export class FindMetaUseCase {
  constructor(private readonly metaRepository: MetaRepository) {}

  async findAll(): Promise<Meta[]> {
    try {
      return this.metaRepository.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<Meta> {
    try {
      return this.metaRepository.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
