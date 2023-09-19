import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { getPublicKey } from '../util/set-keys';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh',
) {
  constructor() {
    let PUBLIC_KEY
    try {
      PUBLIC_KEY = getPublicKey();
    } catch (error) {
      throw new InternalServerErrorException('Erro ao ler chave publica.');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      ignoreExpiration: false,
      secretOrKey: PUBLIC_KEY,
      algorithms: ['RS256'],
    });
  }

  async validate(req: Request, payload: { email: string; sub: string }) {
    const refreshToken = req.get('Authorization')?.replace('Bearer ', '').trim();
    if (!refreshToken || !payload) {
      throw new UnauthorizedException('Refresh Token Invalido');
    }
    return { ...payload, refreshToken };
  }
}
