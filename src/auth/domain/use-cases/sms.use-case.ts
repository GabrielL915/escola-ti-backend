import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsUseCase {
  private codes = new Map<string, number>();
  private tempPhones = new Set<string>();

  async generateCode(phone: string) {
    const code = Math.floor(1000 + Math.random() * 9000);
    this.codes.set(phone, code);
    this.tempPhones.add(phone);
    return code;
  }

  async validateCode(phone: string, code: number) {
    const validCode = this.codes.get(phone);
    if (validCode === code) {
      return true;
    }
    return false;
  }

  getTempPhones() {
    return this.tempPhones;
  }
}
