import { JwtService } from '@nestjs/jwt';

export const generateJwtToken =
  (jwtService: JwtService) => (payload: { email: string; sub: string }) => {
    const access_token = jwtService.sign(payload, {
      expiresIn: '15m',
    });
    const refresh_token = jwtService.sign(payload, {
      expiresIn: '7d',
    });
    return { access_token, refresh_token };
  };
