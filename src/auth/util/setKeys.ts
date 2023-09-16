import { writeFileSync } from 'fs';
import { generateJWTFactory } from '../factories/jwt.factory';
import { InternalServerErrorException } from '@nestjs/common';

export function setKeys() {
  try {
    const { publicKey, privateKey } = generateJWTFactory();
    const keys = {
      publicKey: publicKey,
      privateKey: privateKey,
    };
    writeFileSync('keys.json', JSON.stringify(keys, null, 2));
  } catch (error) {
    throw new InternalServerErrorException('Erro ao gerar chave pública e privada.');
  }
}
