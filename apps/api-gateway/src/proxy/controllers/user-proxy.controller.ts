import { All, Controller, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserProxyService } from '../providers/user-proxy.service';

@Controller('/user')
export class UserProxyController {
  constructor(private readonly userProxyService: UserProxyService) {}

  @All('/*')
  async proxy(@Req() req: Request, @Res() res: Response) {
    return this.userProxyService.proxy(req, res);
  }
}
