import { rsaKeyFactory } from './rsa-key.factory';
import { rsaKeyPair } from '../util/keypair';
import { InternalServerErrorException } from '@nestjs/common';

jest.mock('../util/keypair');

describe('rsaKeyFactory', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a valid key pair and sign options', () => {
    const mockKeyPair = {
      privateKey: 'mockPrivateKey',
      publicKey: 'mockPublicKey'
    };

    (rsaKeyPair as jest.Mock).mockReturnValue(mockKeyPair);

    const result = rsaKeyFactory();
    
    expect(result).toEqual({
      privateKey: mockKeyPair.privateKey,
      publicKey: mockKeyPair.publicKey,
      signOptions: {
        algorithm: 'RS256',
      },
    });
  });

  it('should throw an InternalServerErrorException if an error occurs', () => {
    (rsaKeyPair as jest.Mock).mockImplementation(() => {
      throw new Error('Test error');
    });

    expect(rsaKeyFactory).toThrow(InternalServerErrorException);
  });
});
