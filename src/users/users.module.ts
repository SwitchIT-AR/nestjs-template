import { Module } from '@nestjs/common';
import { UsersAuthService } from './users-auth.service';
import { UsersController } from './users.controller';
import { ConfigurableModuleClass } from './users.module-definition';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, UsersAuthService],
  controllers: [UsersController],
  exports: [UsersAuthService],
})
export class UsersModule extends ConfigurableModuleClass {}
