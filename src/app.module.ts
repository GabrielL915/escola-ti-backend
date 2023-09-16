import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { AuthModule } from './auth/resource/auth.module';
import { SmsPhoneMiddleware } from './common/middleware/sms-phone.middleware';
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
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SmsPhoneMiddleware)
      .forRoutes({ path: 'auth/register', method: RequestMethod.POST });
  }
}
