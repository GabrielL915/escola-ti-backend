import {
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { RefreshTokenStrategy } from './jwt-refresh.strategy';
import { getPublicKey } from '../util/set-keys';

jest.mock('../util/set-keys');

describe('RefreshTokenStrategy', () => {
  let strategy: RefreshTokenStrategy;
  let payload: { email: string; sub: string };

  beforeEach(() => {
    (getPublicKey as jest.Mock).mockReturnValue({
      publicKey: 'fake_key',
    });
    strategy = new RefreshTokenStrategy();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should throw InternalServerErrorException when reading the public key fails', () => {
      (getPublicKey as jest.Mock).mockImplementation(() => {
        throw new Error();
      });
      expect(() => new RefreshTokenStrategy()).toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('validate', () => {
    beforeEach(() => {
      payload = { email: 'emailtest@example.com', sub: 'senha123' };
    });

    it('should throw an UnauthorizedException if Authorization header is missing', async () => {
      const mockReq: any = { get: jest.fn().mockReturnValue(undefined) };
      await expect(strategy.validate(mockReq, payload)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw an UnauthorizedException if payload is undefined', async () => {
      const mockReq: any = { get: jest.fn().mockReturnValue('Bearer token') };
      await expect(strategy.validate(mockReq, undefined)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should return the payload with the refresh token', async () => {
      const mockReq: any = {
        get: jest.fn((headerName: string) =>
          headerName === 'Authorization' ? 'Bearer token' : undefined,
        ),
      };
      const result = await strategy.validate(mockReq, payload);
      expect(result).toEqual({ ...payload, refreshToken: 'token' });
    });
  });
});
