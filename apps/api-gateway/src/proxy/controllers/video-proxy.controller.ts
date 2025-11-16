import { All, Controller, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { VideoProxyService } from '../providers/video-proxy.service';

@Controller('/video')
export class VideoProxyController {
  constructor(private readonly videoProxyService: VideoProxyService) {}

  @All('/*')
  async proxy(@Req() req: Request, @Res() res: Response) {
    return this.videoProxyService.proxy(req, res);
  }
}
