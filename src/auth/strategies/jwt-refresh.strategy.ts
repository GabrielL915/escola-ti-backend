import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { rsaKeyFactory } from '../factories/rsa-key.factory';
import { readFileSync } from 'fs';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    const { publicKey: PUBLIC_KEY } = JSON.parse(
      readFileSync('keys.json', 'utf8'),
    );
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
    if (!refreshToken) {
        throw new UnauthorizedException('Refresh Token Invalido');
        }
    return {...payload, refreshToken};
  }
}
