import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { setKeys, getPublicKey } from '../util/set-keys';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    setKeys();
    let PUBLIC_KEY
    try {
      PUBLIC_KEY = getPublicKey();
    } catch (error) {
      throw new InternalServerErrorException('Erro ao ler chave publica.');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: PUBLIC_KEY,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: string) {
    if (!payload) {
      throw new UnauthorizedException('Token Invalido');
    }
    return payload;
  }
}
