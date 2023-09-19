import { Module } from '@nestjs/common';
import { CampanhaModule } from './campanha/resource/campanha.module';
import { KnexModule } from 'nest-knexjs';
import { ObjetivoModule } from './objetivo/resource/objetivo.module';

@Module({
  imports: [
    CampanhaModule,
    ObjetivoModule,
    KnexModule.forRoot({
      config: {
        client: 'postgresql',
        useNullAsDefault: true,
        connection: {
          connectionString:
            'postgres://xkmgiqmeqhkwwe:f152290282748d2a00f99cd00291250c6fd4f4c4c51b76c3de99e253e669bd0c@ec2-34-235-108-214.compute-1.amazonaws.com:5432/deldtuvig09lb1',
          ssl: { rejectUnauthorized: false },
          host: 'ec2-34-235-108-214.compute-1.amazonaws.com',
          port: 5432,
          user: 'xkmgiqmeqhkwwe',
          database: 'deldtuvig09lb1',
          password:
            'f152290282748d2a00f99cd00291250c6fd4f4c4c51b76c3de99e253e669bd0c',
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
