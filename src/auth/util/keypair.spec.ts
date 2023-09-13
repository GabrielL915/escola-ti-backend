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


// 2.1. Método singIn
// Objetivo: Testar a capacidade de um usuário fazer login no sistema.
// Cenários:
//  1 - Login bem-sucedido:
//         Descrição: O usuário fornece credenciais válidas e deve receber os tokens de acesso e atualização.
//         Entrada: LoginDto com e-mail e senha válidos.
//         Saída esperada: Tokens de acesso e atualização.
//  2 - Credenciais inválidas:
//         Descrição: O usuário fornece credenciais inválidas e deve receber uma exceção de não autorizado.
//         Entrada: LoginDto com e-mail ou senha inválidos.
//         Saída esperada: UnauthorizedException.