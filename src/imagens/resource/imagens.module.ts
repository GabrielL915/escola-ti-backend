import { Module } from '@nestjs/common';
import { CreateImagenUseCase } from '../domain/use-cases/create-imagem.use-case';
import { ImagemRepositoryImpl } from '../data-access/infraestructure/repository/imagem.repository.impl';
import { ImagemRepository } from '../domain/repository/imagem.repository';

@Module({
  providers: [
    CreateImagenUseCase,
    {
      provide: ImagemRepository,
      useClass: ImagemRepositoryImpl,
    },
  ],
  exports: [CreateImagenUseCase],
})
export class ImagensModule {}
