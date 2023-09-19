import { writeFileSync } from 'fs';
import { rsaKeyFactory } from '../factories/rsa-key.factory';
import { InternalServerErrorException } from '@nestjs/common';
import { setKeys } from './set-keys';

jest.mock('fs');
jest.mock('../factories/rsa-key.factory');

describe('setKeys', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should write keys to file correctly', () => {
    (rsaKeyFactory as jest.Mock).mockReturnValue({
      publicKey: 'mockPublicKey',
      privateKey: 'mockPrivateKey',
    });

    setKeys();

    expect(writeFileSync).toHaveBeenCalledWith(
      'keys.json',
      JSON.stringify(
        {
          publicKey: 'mockPublicKey',
          privateKey: 'mockPrivateKey',
        },
        null,
        2,
      ),
    );
  });

  it('should throw InternalServerErrorException if there is an error writing to file', () => {
    (rsaKeyFactory as jest.Mock).mockReturnValue({
      publicKey: 'mockPublicKey',
      privateKey: 'mockPrivateKey',
    });
    (writeFileSync as jest.Mock).mockImplementation(() => {
      throw new Error();
    });

    expect(() => setKeys()).toThrow(InternalServerErrorException);
  });

  it('should throw InternalServerErrorException if there is an error generating keys', () => {
    (rsaKeyFactory as jest.Mock).mockImplementation(() => {
      throw new Error();
    });

    expect(() => setKeys()).toThrow(InternalServerErrorException);
  });
});
