import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { rsaKeyFactory } from '../factories/rsa-key.factory';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../strategies/jwt-access.strategy';
import { RefreshTokenStrategy } from '../strategies/jwt-refresh.strategy';
import { RegisterUseCase } from '../domain/use-cases/register.use-case';
import { LoginUseCase } from '../domain/use-cases/login.use-case';
import { ProfileUseCase } from '../domain/use-cases/profile.use-case';
import { SmsUseCase } from '../domain/use-cases/sms.use-case';
import { RefreshTokenUseCase } from '../domain/use-cases/refresh-token.use-case';
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: rsaKeyFactory,
    }),
    PassportModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    RefreshTokenStrategy,
    RegisterUseCase,
    LoginUseCase,
    ProfileUseCase,
    SmsUseCase,
    RefreshTokenUseCase
  ],
  exports: [SmsUseCase],
})
export class AuthModule {}
