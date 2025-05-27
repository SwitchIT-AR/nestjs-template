import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthenticationGuard,
  AuthenticationGuardProvider,
} from './authentication.guard';
import { SessionsRepository } from './sessions.repository';

@Module({
  providers: [
    SessionsRepository,
    AuthService,
    AuthenticationGuard,
    AuthenticationGuardProvider,
  ],
})
export class AuthModule {}
