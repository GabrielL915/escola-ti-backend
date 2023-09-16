import { InternalServerErrorException } from '@nestjs/common';
import { randomBytes, scryptSync } from 'crypto';
export const hashPassword = (senha: string, saltCarregado?: string) => {
  try {
    const salt = saltCarregado
      ? Buffer.from(saltCarregado, 'hex')
      : randomBytes(16);

    const hash = scryptSync(senha, salt, 10);

    return `${salt.toString('hex')}.${hash.toString('hex')}`;
  } catch (error) {
    throw new InternalServerErrorException('Erro ao gerar chave pública e privada.', error);
  }
};
