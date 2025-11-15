import { Module } from '@nestjs/common';
import { CoursesProxyController } from './controllers/courses-proxy.controller';
import { CoursesProxyService } from './providers/courses-proxy.service';
import { AuthProxyController } from './controllers/auth-proxy.controller';
import { AuthProxyService } from './providers/auth-proxy.service';

@Module({
  controllers: [CoursesProxyController, AuthProxyController],
  providers: [CoursesProxyService, AuthProxyService],
})
export class ProxyModule {}
