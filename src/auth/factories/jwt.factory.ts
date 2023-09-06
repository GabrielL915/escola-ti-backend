import { generateRSAKeyPair } from 'src/shared/util/keypair';
import { Algorithm } from 'jsonwebtoken';

export function generateJWTFactory() {
  const keyPair = generateRSAKeyPair();
  return {
    privateKey: keyPair.privateKey,
    publicKey: keyPair.publicKey,
    signOptions: {
      algorithm: 'RS256' as Algorithm,
    },
  };
}
