import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ZodPipe } from '../common/zod.pipe';
import { NewUser, newUserSchema } from './schemas/new-user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body(new ZodPipe(newUserSchema)) data: NewUser) {
    return this.usersService.createUser(data);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string) {
    return this.usersService.deleteUser(userId);
  }
}
