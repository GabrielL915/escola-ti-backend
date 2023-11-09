import { Module } from '@nestjs/common';
import { CreateImagenUseCase } from '../domain/use-cases/create-imagem.use-case';
import { ImagemRepositoryImpl } from '../data-access/infraestructure/repository/imagem.repository.impl';
import { ImagemRepository } from '../domain/repository/imagem.repository';
import { DeleteImagensUseCase } from '../domain/use-cases/delete-imagem.use-case';
import { FindAllImagensUseCase } from '../domain/use-cases/find-all-imagem.use-case';
import { FindByIdImagemUseCase } from '../domain/use-cases/find-by-id-imagem.use-case';
import { UpdateImagemUseCase } from '../domain/use-cases/update-imagem.use-case';
import {
  IMAGEN_CREATE_PROVIDER,
  IMAGEN_FIND_BY_ID_PROVIDER,
  IMAGEN_DELETE_PROVIDER,
  IMAGEN_UPDATE_PROVIDER,
} from '../../shared/constants/injection-tokens';
@Module({
  providers: [
    CreateImagenUseCase,
    FindAllImagensUseCase,
    DeleteImagensUseCase,
    FindByIdImagemUseCase,
    {
      provide: ImagemRepository,
      useClass: ImagemRepositoryImpl,
    },
    {
      provide: IMAGEN_CREATE_PROVIDER,
      useClass: CreateImagenUseCase,
    },
    {
      provide: IMAGEN_FIND_BY_ID_PROVIDER,
      useClass: FindByIdImagemUseCase,
    },
    {
      provide: IMAGEN_DELETE_PROVIDER,
      useClass: DeleteImagensUseCase,
    },
    {
      provide: IMAGEN_UPDATE_PROVIDER,
      useClass: UpdateImagemUseCase,
    },
  ],
  exports: [
    CreateImagenUseCase,
    FindByIdImagemUseCase,
    DeleteImagensUseCase,
    IMAGEN_CREATE_PROVIDER,
    IMAGEN_FIND_BY_ID_PROVIDER,
    IMAGEN_DELETE_PROVIDER,
    IMAGEN_UPDATE_PROVIDER,
  ],
})
export class ImagensModule {}
