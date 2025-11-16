import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserProxyService {
  private userServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.userServiceUrl = this.configService.get('USER_SERVICE_URL');
  }

  async proxy(req: Request, res: Response) {
    const { body, headers, originalUrl, method } = req;
    const url = `${this.userServiceUrl}${originalUrl}`;
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
