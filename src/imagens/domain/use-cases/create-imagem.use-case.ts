import { Injectable } from '@nestjs/common';
import { CreateImagenDto } from '../dto/create-imagen.dto';
import { ImagemRepository } from '../repository/imagem.repository';

@Injectable()
export class CreateImagenUseCase {
  constructor(private readonly imagenRepository: ImagemRepository) {}

  async create(input: CreateImagenDto) {
    return await this.imagenRepository.create(input);
  }
}
