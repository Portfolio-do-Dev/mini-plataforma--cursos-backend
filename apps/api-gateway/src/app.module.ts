import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ProxyModule } from './proxy/proxy.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    HttpModule.registerAsync({
      useFactory: () => {
        return {
          timeout: 5000,
        };
      },
    }),
    ProxyModule,
  ],
})
export class AppModule {}
