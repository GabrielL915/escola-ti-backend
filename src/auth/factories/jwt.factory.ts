import { InternalServerErrorException } from '@nestjs/common';
import { generateRSAKeyPair } from '../util/keypair';
import { Algorithm } from 'jsonwebtoken';

export function generateJWTFactory() {
  try {
  const keyPair = generateRSAKeyPair();
  return {
    privateKey: keyPair.privateKey,
    publicKey: keyPair.publicKey,
    signOptions: {
      algorithm: 'RS256' as Algorithm,
    },
  };
  } catch (error) {
    throw new InternalServerErrorException('Erro ao gerar chave pública e privada.', error);
  }
}
