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

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: generateJWTFactory,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshTokenStrategy, RegisterUseCase, LoginUseCase],
  exports: [AuthService],
})
export class AuthModule {}
