import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUseCase } from '../domain/use-cases/login.use-case';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private loginUseCase: LoginUseCase) {
        super({
            usernameField: 'email',
            passwordField: 'senha',
        });
    }

    async validate(email: string, senha: string) {
        const user = await this.loginUseCase.validateEntregador(email, senha);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}