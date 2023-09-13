import { UnauthorizedException } from '@nestjs/common';
import { RefreshTokenStrategy } from './jwt-refresh.strategy';

describe('RefreshTokenStrategy', () => {
  let strategy: RefreshTokenStrategy;
  let payload: { email: string; sub: string };

  beforeEach(() => {
    strategy = new RefreshTokenStrategy();
  });

  describe('validate', () => {
    it('should throw an UnauthorizedException if Authorization header is missing', async () => {
      payload = { email: 'emailtest@example.com', sub: 'senha123' };
      const mockReq: any = {
        get: (headerName: string) => {
          return undefined;
        },
      };
      await expect(strategy.validate(mockReq, payload)).rejects.toThrow(
        UnauthorizedException,
      );
    });
    it('should return the payload with the refresh token', async () => {
      payload = { email: 'emailtest@example.com', sub: 'senha123' };
      const mockReq: any = {
        get: (headerName: string) => {
          if (headerName === 'Authorization') {
            return 'Bearer token';
          }
        },
      };
      const result = await strategy.validate(mockReq, payload);

      expect(result).toEqual({ ...payload, refreshToken: expect.any(String) });
      expect(result.refreshToken).toBeDefined();
      expect(result.refreshToken).toBe('token');
    });
  });
});
