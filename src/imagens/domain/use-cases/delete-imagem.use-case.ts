import { Injectable } from '@nestjs/common';
import { ImagemRepository } from '../repository/imagem.repository';

@Injectable()
export class DeleteImagensUseCase {
  constructor(private readonly imagensRepository: ImagemRepository) {}

  async delete(id: string) {
    return await this.imagensRepository.delete(id);
  }
}