import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersAuthService } from './users-auth.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [ConfigModule],
  providers: [UsersService, UsersAuthService],
  controllers: [UsersController],
  exports: [UsersAuthService],
})
export class UsersModule {}
