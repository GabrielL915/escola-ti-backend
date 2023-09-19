import { JwtStrategy } from './jwt-access.strategy';
import { UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { getPublicKey } from '../util/set-keys';

jest.mock('../util/set-keys');

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(() => {
    (getPublicKey as jest.Mock).mockReturnValue({ publicKey: 'fake_key' });
    strategy = new JwtStrategy();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should throw InternalServerErrorException when reading the public key fails', () => {
      (getPublicKey as jest.Mock).mockImplementation(() => {
        throw new Error();
      });
      expect(() => new JwtStrategy()).toThrow(InternalServerErrorException);
    });
  });

  describe('validate', () => {
    it('should return the payload if it exists', async () => {
      const mockPayload = 'validPayload';
      const result = await strategy.validate(mockPayload);
      expect(result).toEqual(mockPayload);
    });

    it('should throw UnauthorizedException if payload does not exist', async () => {
      await expect(strategy.validate('')).rejects.toThrow(UnauthorizedException);
    });
  });
});
