import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  providers: [PasswordService, UsersRepository, UsersService],
})
export class UsersModule {}
