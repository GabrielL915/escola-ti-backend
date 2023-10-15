import { Module } from '@nestjs/common';
import { CreateImagenUseCase } from '../domain/use-cases/create-imagem.use-case';
import { ImagemRepositoryImpl } from '../data-access/infraestructure/repository/imagem.repository.impl';
import { ImagemRepository } from '../domain/repository/imagem.repository';
import { DeleteImagensUseCase } from '../domain/use-cases/delete-imagem.use-case';
import { FindAllImagensUseCase } from '../domain/use-cases/find-all-imagem.use-case';

@Module({
  providers: [
    CreateImagenUseCase,
    FindAllImagensUseCase,
    DeleteImagensUseCase,
    {
      provide: ImagemRepository,
      useClass: ImagemRepositoryImpl,
    },
  ],
  exports: [CreateImagenUseCase, FindAllImagensUseCase, DeleteImagensUseCase],
})
export class ImagensModule {}
