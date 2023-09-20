import { InternalServerErrorException } from '@nestjs/common';
import { rsaKeyPair } from '../util/keypair';
import { Algorithm } from 'jsonwebtoken';

export function rsaKeyFactory() {
  try {
  const keyPair = rsaKeyPair();
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
