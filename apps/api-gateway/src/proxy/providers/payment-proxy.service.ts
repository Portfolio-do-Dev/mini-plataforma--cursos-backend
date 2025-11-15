import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PaymentProxyService {
  private paymentServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.paymentServiceUrl = this.configService.get('PAYMENT_SERVICE_URL');
  }

  async proxy(req: Request, res: Response) {
    const { body, headers, originalUrl, method } = req;
    const url = `${this.paymentServiceUrl}${originalUrl}`;
    const response = await firstValueFrom(
      this.httpService.request({
        url,
        method,
        data: body,
        headers,
      }),
    );

    return res.status(response.status).json(response.data);
  }
}
