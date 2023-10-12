import { Module } from '@nestjs/common';
import { ImagensService } from './imagens.service';
import { ImagensController } from './imagens.controller';

@Module({
  controllers: [ImagensController],
  providers: [ImagensService],
})
export class ImagensModule {}
