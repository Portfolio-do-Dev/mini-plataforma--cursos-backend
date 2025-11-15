import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CoursesProxyService {
  private coursesServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.coursesServiceUrl = this.configService.get('COURSES_SERVICE_URL');
  }

  async proxy(req: Request, res: Response) {
    const { body, headers, originalUrl, method } = req;
    const url = `${this.coursesServiceUrl}${originalUrl}`;
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
