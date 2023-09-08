import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../resource-auth/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(email: string, senha: string) {
        const user = await this.authService.validateEntregador(email, senha);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}