import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ProxyModule } from './proxy/proxy.module';
import { APP_FILTER } from '@nestjs/core';
import { AxiosExceptionFilter } from './common/filters/axios-exception-filter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    HttpModule.registerAsync({
      useFactory: () => {
        return {
          timeout: 5000,
        };
      },
      global: true,
    }),
    ProxyModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: AxiosExceptionFilter }],
})
export class AppModule {}
