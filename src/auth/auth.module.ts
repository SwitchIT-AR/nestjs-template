import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthGuardProvider } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
  imports: [ConfigModule, UsersModule],
  providers: [AuthService, AuthGuardProvider],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('{*splat}');
  }
}
