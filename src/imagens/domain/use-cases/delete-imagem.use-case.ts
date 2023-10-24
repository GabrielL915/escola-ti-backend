import { Injectable } from '@nestjs/common';
import { ImagemRepository } from '../repository/imagem.repository';
import { IDelete } from '../../../shared/interfaces/delete.interface';
@Injectable()
export class DeleteImagensUseCase implements IDelete<void> {
  constructor(private readonly imagensRepository: ImagemRepository) {}

  async delete(id: string) {
    return await this.imagensRepository.delete(id);
  }
}
