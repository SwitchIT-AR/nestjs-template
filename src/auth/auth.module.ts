import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthGuardProvider } from './auth.guard';
import { ConfigurableModuleClass } from './auth.module-definition';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule],
  providers: [AuthService, AuthGuardProvider],
  controllers: [AuthController],
})
export class AuthModule extends ConfigurableModuleClass implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('{*splat}');
  }
}
