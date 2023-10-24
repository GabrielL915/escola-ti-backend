import { Injectable } from '@nestjs/common';
import { ImagemRepository } from '../repository/imagem.repository';

@Injectable()
export class FindAllImagensUseCase {
  constructor(private readonly imagensRepository: ImagemRepository) {}

  async findAll() {
    return await this.imagensRepository.findAll();
  }
}