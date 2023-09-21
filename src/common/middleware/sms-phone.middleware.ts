import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SmsUseCase } from '../../auth/domain/use-cases/sms.use-case';

@Injectable()
export class SmsPhoneMiddleware implements NestMiddleware {
  constructor(private readonly smsUseCase: SmsUseCase) {}

  use(req: Request, res: Response, next: NextFunction) {
    const tempPhone = this.smsUseCase.getTempPhones().values().next().value;

    if (tempPhone) {
      req.body.telefone = tempPhone;
      next();
    }
  }
}
