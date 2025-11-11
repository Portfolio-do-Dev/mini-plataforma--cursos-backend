import { All, Controller, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CoursesProxyProvider } from '../providers/courses-proxy.service';

@Controller('/courses')
export class CoursesProxyController {
  constructor(private readonly coursesProxyService: CoursesProxyProvider) {}

  @All('/*')
  async proxyToCourseService(@Req() req: Request, @Res() res: Response) {
    return this.coursesProxyService.proxyToCourseService(req, res);
  }
}
