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
