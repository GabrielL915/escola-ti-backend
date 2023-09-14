import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { generateJWTFactory } from '../factories/jwt.factory';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../strategies/jwt-access.strategy';
import { RefreshTokenStrategy } from '../strategies/jwt-refresh.strategy';
import { RegisterUseCase } from '../domain/use-cases/register.use-case';
import { LoginUseCase } from '../domain/use-cases/login.use-case';
import { ProfileUseCase } from '../domain/use-cases/profile.use-case';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: generateJWTFactory,
    }),
    PassportModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    RefreshTokenStrategy,
    AuthService,
    RegisterUseCase,
    LoginUseCase,
    ProfileUseCase,
  ],
  exports: [AuthService],
})
export class AuthModule {}
