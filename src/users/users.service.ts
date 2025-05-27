import {
  EntityManager,
  UniqueConstraintViolationException,
} from '@mikro-orm/postgresql';
import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { PasswordService } from './password.service';
import { NewUser } from './schemas/new-user.schema';

@Injectable()
export class UsersService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly em: EntityManager,
  ) {}

  async createUser(data: NewUser) {
    const { password, ...rest } = data;
    const passwordHash = await this.passwordService.hash(password);
    const user = new User({ passwordHash, ...rest });
    try {
      await this.em.persist(user).flush();
    } catch (err: unknown) {
      if (err instanceof UniqueConstraintViolationException)
        throw new ConflictException('Username is already in use');
      throw err;
    }
  }
}
