import { rsaKeyFactory } from '../factories/rsa-key.factory';
import { InternalServerErrorException } from '@nestjs/common';
import NodeCache from 'node-cache';

const cache = new NodeCache();

export function setKeys() {
  try {
    const { publicKey, privateKey } = rsaKeyFactory();
    cache.set('publicKey', publicKey);
    cache.set('privateKey', privateKey);
  } catch (error) {
    throw new InternalServerErrorException(
      'Erro ao gerar chave pública e privada.',
    );
  }
}

export function getPublicKey(): { publicKey: string } {
  return cache.get('publicKey');
}

export function getPrivateKey(): { privateKey: string } {
  return cache.get('privateKey');
}
