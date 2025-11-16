import { All, Controller, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthProxyService } from '../providers/auth-proxy.service';

@Controller('/auth')
export class AuthProxyController {
  constructor(private readonly authProxyService: AuthProxyService) {}

  @All('/*')
  async proxy(@Req() req: Request, @Res() res: Response) {
    return this.authProxyService.proxy(req, res);
  }
}
