import { All, Controller, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CoursesProxyService } from '../providers/courses-proxy.service';

@Controller('/courses')
export class CoursesProxyController {
  constructor(private readonly coursesProxyService: CoursesProxyService) {}

  @All('/*')
  async proxy(@Req() req: Request, @Res() res: Response) {
    return this.coursesProxyService.proxy(req, res);
  }
}
