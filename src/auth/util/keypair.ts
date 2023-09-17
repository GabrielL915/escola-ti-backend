import { generateKeyPairSync } from 'crypto';

export function rsaKeyPair() {
  try {
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });

    return {
      publicKey: publicKey,
      privateKey: privateKey,
    };
  } catch (error) {
    throw new Error(`Erro ao gerar chaves RSA: ${error.message}`);
  }
}
