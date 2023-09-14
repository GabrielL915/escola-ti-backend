import { generateRSAKeyPair } from './keypair';
import { privateDecrypt, publicEncrypt} from 'crypto';

describe('generate RSA keypair', () => {

  let result: { publicKey: string, privateKey: string };
  
  beforeAll(() => {
    result = generateRSAKeyPair();
  });

  describe('Public Key', () => {
    it('should be defined', () => {
      expect(result.publicKey).toBeDefined();
    });

    it('should have the correct format', () => {
      expect(result.publicKey.startsWith('-----BEGIN PUBLIC KEY-----')).toBe(true);
      expect(result.publicKey.endsWith('-----END PUBLIC KEY-----\n')).toBe(true);
    });
  });

  describe('Private Key', () => {
    it('should be defined', () => {
      expect(result.privateKey).toBeDefined();
    });

    it('should have the correct format', () => {
      expect(result.privateKey.startsWith('-----BEGIN PRIVATE KEY-----')).toBe(true);
      expect(result.privateKey.endsWith('-----END PRIVATE KEY-----\n')).toBe(true);
    });
  });

  it('should be a valid key pair', () => {
    const text = "Strogonoff de frango";
    const encrypted = publicEncrypt(result.publicKey, Buffer.from(text));
    const decrypted = privateDecrypt(result.privateKey, encrypted);
    expect(decrypted.toString()).toEqual(text);
  });
});