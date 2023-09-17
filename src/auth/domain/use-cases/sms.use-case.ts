import { Injectable } from '@nestjs/common';
import { error } from 'console';

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
      throw error;
    }
  }

  async validateCode(phone: string, code: number) {
    try {
      const validCode = this.codes.get(phone);
      if (validCode === code) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  getTempPhones() {
    try {
      return this.tempPhones;
    } catch (error) {
      throw error;
    }
  }
}
