import { UsersModule } from '@/users';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthenticationGuard,
  AuthenticationGuardProvider,
} from './authentication.guard';
import {
  AuthorizationGuard,
  AuthorizationGuardProvider,
} from './authorization.guard';
import { SessionsRepository } from './sessions.repository';

@Module({
  imports: [UsersModule],
  providers: [
    SessionsRepository,
    AuthService,
    AuthenticationGuard,
    AuthenticationGuardProvider,
    AuthorizationGuard,
    AuthorizationGuardProvider,
  ],
})
export class AuthModule {}
