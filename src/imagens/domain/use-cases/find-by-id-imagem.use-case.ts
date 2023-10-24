import { Injectable } from '@nestjs/common';
import { ImagemRepository } from '../repository/imagem.repository';
import { IFindById } from '../../../shared/interfaces/find-by-id.interface';
import { Imagen } from '../entities/imagen.entity';
@Injectable()
export class FindByIdImagemUseCase implements IFindById<Imagen>{
  constructor(private readonly imagemRepository: ImagemRepository) {}

  findById(id: string) {
    return this.imagemRepository.findById(id);
  }
}