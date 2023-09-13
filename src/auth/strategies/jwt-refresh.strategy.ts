import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { generateJWTFactory } from '../factories/jwt.factory';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    const { publicKey } = generateJWTFactory();
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      ignoreExpiration: false,
      secretOrKey: publicKey,
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
