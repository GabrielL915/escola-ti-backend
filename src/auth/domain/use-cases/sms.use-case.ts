import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
@Injectable()
export class SmsUseCase {
  private codes = new Map<string, number>();
  private tempPhones = new Set<string>();

  async generateCode(phone: string) {
    try {
      const code = Math.floor(1000 + Math.random() * 9000);
      this.codes.set(phone, code);
      this.tempPhones.add(phone);
      return code;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao gerar código de verificação.',
        error,
      );
    }
  }

  async validateCode(phone: string, code: number) {
    const validCode = this.codes.get(phone);
    if (validCode === code) {
      return true;
    }
    throw new BadRequestException('Erro ao validar código de verificação.');
  }

  getTempPhones() {
    return this.tempPhones;
  }
}
