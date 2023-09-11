import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { MotoboyModule } from './motoboy/resource/motoboy.module';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'postgresql',
        useNullAsDefault: true,
        connection: {
          connectionString:
        '',
      ssl: { rejectUnauthorized: false },
      host: '',
      port: 5432,
      user: '',
      database: '',
      password:
        '',
        },
      },
    }),
    MotoboyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
