import { CampaignModule } from './campanha/resource/campaign.module';
import { KnexModule } from 'nest-knexjs';
import { ObjectiveModule } from './objetivo/resource/objective.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/resource/auth.module';
import { SmsPhoneMiddleware } from './common/middleware/sms-phone.middleware';
import { ConfigModule } from '@nestjs/config';
import { MetaModule } from './meta/resource/meta.module';
import { RegisteredModule } from './inscrito/resource/registered.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    }),
    KnexModule.forRoot({
      config: {
        client: 'postgresql',
        useNullAsDefault: true,
        connection: {
          connectionString: process.env.CONNECTION_STRING,
          ssl: { rejectUnauthorized: false },
          host: process.env.HOST,
          port: 5432,
          user: process.env.USER,
          database: process.env.DATABASE,
          password: process.env.PASSWORD,
        },
      },
    }),
    AuthModule,
    CampaignModule,
    ObjectiveModule,
    MetaModule,
    RegisteredModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SmsPhoneMiddleware)
      .forRoutes({ path: 'auth/register', method: RequestMethod.POST });
  }
}
