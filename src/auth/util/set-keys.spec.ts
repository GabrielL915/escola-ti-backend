import { rsaKeyFactory } from '../factories/rsa-key.factory';
import { InternalServerErrorException } from '@nestjs/common';
import { setKeys, getPublicKey, getPrivateKey } from './set-keys';

jest.mock('../factories/rsa-key.factory');

describe('setKeys', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should save keys to cache correctly', () => {
    (rsaKeyFactory as jest.Mock).mockReturnValue({
      publicKey: 'mockPublicKey',
      privateKey: 'mockPrivateKey',
    });

    setKeys();

    expect(getPublicKey()).toEqual('mockPublicKey');
    expect(getPrivateKey()).toEqual('mockPrivateKey');
  });

  it('should throw InternalServerErrorException if there is an error generating keys', () => {
    (rsaKeyFactory as jest.Mock).mockImplementation(() => {
      throw new Error();
    });

    expect(() => setKeys()).toThrow(InternalServerErrorException);
  });
});
