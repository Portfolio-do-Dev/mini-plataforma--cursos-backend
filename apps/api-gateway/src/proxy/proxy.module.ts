import { Module } from '@nestjs/common';
import { CoursesProxyController } from './controllers/courses-proxy.controller';
import { CoursesProxyProvider } from './providers/courses-proxy.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CoursesProxyController],
  providers: [CoursesProxyProvider],
})
export class ProxyModule {}
