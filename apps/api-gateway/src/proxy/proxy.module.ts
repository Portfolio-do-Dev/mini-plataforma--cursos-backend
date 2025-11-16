import { Module } from '@nestjs/common';
import { CoursesProxyController } from './controllers/courses-proxy.controller';
import { CoursesProxyService } from './providers/courses-proxy.service';
import { AuthProxyController } from './controllers/auth-proxy.controller';
import { AuthProxyService } from './providers/auth-proxy.service';
import { UserProxyController } from './controllers/user-proxy.controller';
import { PaymentProxyController } from './controllers/payment-proxy.controller';
import { VideoProxyController } from './controllers/video-proxy.controller';
import { UserProxyService } from './providers/user-proxy.service';
import { PaymentProxyService } from './providers/payment-proxy.service';
import { VideoProxyService } from './providers/video-proxy.service';

@Module({
  controllers: [
    CoursesProxyController,
    AuthProxyController,
    UserProxyController,
    PaymentProxyController,
    VideoProxyController,
  ],
  providers: [
    CoursesProxyService,
    AuthProxyService,
    UserProxyService,
    PaymentProxyService,
    VideoProxyService,
  ],
})
export class ProxyModule {}
