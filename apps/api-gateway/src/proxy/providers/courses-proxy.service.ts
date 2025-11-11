import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CoursesProxyProvider {
  private courseServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.courseServiceUrl = this.configService.get('COURSE_SERVICE_URL');
  }

  async proxyToCourseService(req: Request, res: Response) {
    try {
      const { body, headers, originalUrl, method } = req;
      const targetUrl = `${this.courseServiceUrl}${originalUrl}`;
      const response = await firstValueFrom(
        this.httpService.request({
          url: targetUrl,
          method,
          data: body,
          headers: {
            Authorization: headers.authorization,
            'Content-Type': headers['content-type'],
          },
        }),
      );

      return res.status(response.status).json(response.data);
    } catch (error) {
      console.log(error);
      return res.status(error.response?.status || 500).json({
        message: error.message,
      });
    }
  }
}
