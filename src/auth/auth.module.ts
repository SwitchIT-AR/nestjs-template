import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SessionsRepository } from './sessions.repository';

@Module({
  providers: [SessionsRepository, AuthService],
})
export class AuthModule {}
