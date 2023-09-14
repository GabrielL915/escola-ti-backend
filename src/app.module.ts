import { Module } from '@nestjs/common';
import { CampanhaModule } from './campanha/resource/campanha.module';
import { KnexModule } from 'nest-knexjs';

@Module({
  imports: [
    CampanhaModule,
    KnexModule.forRoot({
      config: {
        client: 'postgresql',
        useNullAsDefault: true,
        connection: {},
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
