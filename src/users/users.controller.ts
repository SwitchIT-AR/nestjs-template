import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  PaginationOptions,
  paginationOptionsSchema,
} from '../common/pagination-options.schema';
import { ZodPipe } from '../common/zod.pipe';
import { NewPassword, newPasswordSchema } from './schemas/new-password.schema';
import { NewUser, newUserSchema } from './schemas/new-user.schema';
import { NewUsername, newUsernameSchema } from './schemas/new-username.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body(new ZodPipe(newUserSchema)) data: NewUser) {
    return this.usersService.createUser(data);
  }

  @Get()
  async listUsers(
    @Query(new ZodPipe(paginationOptionsSchema)) opts: PaginationOptions,
  ) {
    return this.usersService.listUsers(opts);
  }

  @Post(':userId/username')
  async changeUsername(
    @Param('userId') userId: string,
    @Body(new ZodPipe(newUsernameSchema)) data: NewUsername,
  ) {
    return this.usersService.changeUsername(userId, data);
  }

  @Post(':userId/password')
  async changePassword(
    @Param('userId') userId: string,
    @Body(new ZodPipe(newPasswordSchema)) data: NewPassword,
  ) {
    return this.usersService.changePassword(userId, data);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string) {
    return this.usersService.deleteUser(userId);
  }
}
