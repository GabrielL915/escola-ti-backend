import { SmsUseCase } from './sms.use-case';
import {
  BadRequestException,
} from '@nestjs/common';

describe('SmsUseCase', () => {
  let smsUseCase: SmsUseCase;

  beforeEach(() => {
    smsUseCase = new SmsUseCase();
  });

/* TODO: Fix this test
  it('should generate a code', async () => {
    const phone = '1234567890';
    const code = await smsUseCase.generateCode(phone);

    expect(code).toBeGreaterThanOrEqual(1000);
    expect(code).toBeLessThanOrEqual(9999);
  });
 */
/* TODO: Fix this test   
it('should validate a code', async () => {
    const phone = '1234567890';
    const code = 1234;

    await smsUseCase.generateCode(phone);

    const isValid = await smsUseCase.validateCode(phone, code);
    expect(isValid).toBeTruthy();
  });
 */
  it('should throw BadRequestException when validating an invalid code', async () => {
    const phone = '1234567890';
    const invalidCode = 9999;

    await smsUseCase.generateCode(phone);

    await expect(smsUseCase.validateCode(phone, invalidCode)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should get temporary phones', async () => {
    const tempPhones = smsUseCase.getTempPhones();
    expect(Array.from(tempPhones)).toEqual([]);
  });

});
