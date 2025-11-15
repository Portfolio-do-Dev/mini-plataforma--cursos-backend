import { All, Controller, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PaymentProxyService } from '../providers/payment-proxy.service';

@Controller('/payment')
export class PaymentProxyController {
  constructor(private readonly paymentProxyService: PaymentProxyService) {}

  @All('/*')
  async proxy(@Req() req: Request, @Res() res: Response) {
    return this.paymentProxyService.proxy(req, res);
  }
}
