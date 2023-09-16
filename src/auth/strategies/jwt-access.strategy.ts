import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { setKeys } from '../util/setKeys'
import { readFileSync } from 'fs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    setKeys();
    const { publicKey: PUBLIC_KEY } = JSON.parse(
      readFileSync('keys.json', 'utf8'),
    );
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
