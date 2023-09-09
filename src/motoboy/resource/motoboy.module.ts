import { Module } from '@nestjs/common';
import { MotoboyController } from './motoboy.controller';

@Module({
  controllers: [MotoboyController],
  providers: [],
})
export class MotoboyModule {}
