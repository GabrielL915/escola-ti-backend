import { writeFileSync } from 'fs';
import { rsaKeyFactory } from '../factories/rsa-key.factory';
import { InternalServerErrorException } from '@nestjs/common';

export function setKeys() {
  try {
    const { publicKey, privateKey } = rsaKeyFactory();
    const keys = {
      publicKey: publicKey,
      privateKey: privateKey,
    };
    writeFileSync('keys.json', JSON.stringify(keys, null, 2));
  } catch (error) {
    throw new InternalServerErrorException('Erro ao gerar chave pública e privada.');
  }
}
