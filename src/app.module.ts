import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { AuthModule } from './auth/resource/auth.module';
import { MotoboyModule } from './motoboy/resource/motoboy.module';
import { SmsPhoneMiddleware } from './common/middleware/sms-phone.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
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
          user:  process.env.USER,
          database: process.env.DATABASE,
          password: process.env.PASSWORD,
        },
      },
    }),
 
    MotoboyModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SmsPhoneMiddleware)
      .forRoutes({ path: 'auth/register', method: RequestMethod.POST });
  }
}
