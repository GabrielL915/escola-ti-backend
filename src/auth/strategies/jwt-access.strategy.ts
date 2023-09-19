import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { setKeys } from '../util/set-keys';
import { readFileSync } from 'fs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    setKeys();
    let PUBLIC_KEY;
    try {
      const keyData = JSON.parse(readFileSync('keys.json', 'utf8'));
      PUBLIC_KEY = keyData.publicKey;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao ler chave publica..');
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
