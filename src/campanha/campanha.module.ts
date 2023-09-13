import { Module } from '@nestjs/common';
import { CampanhaService } from './campanha.service';
import { CampanhaController } from './campanha.controller';

@Module({
  controllers: [CampanhaController],
  providers: [CampanhaService],
})
export class CampanhaModule {}
