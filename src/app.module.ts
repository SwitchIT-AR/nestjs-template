import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'node:path';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve('public'),
      exclude: ['/api/{*splat}'],
    }),
  ],
})
export class AppModule {}
