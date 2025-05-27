import {
  EntityManager,
  UniqueConstraintViolationException,
} from '@mikro-orm/postgresql';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { PasswordService } from './password.service';
import { NewUser } from './schemas/new-user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
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

  async disableUser(userId: string) {
    const user = await this.usersRepository.findOneById(userId);
    if (user === null) throw new NotFoundException();
    user.disable();
    await this.em.flush();
  }

  async restoreUser(userId: string) {
    const user = await this.usersRepository.findOneById(userId);
    if (user === null) throw new NotFoundException();
    user.restore();
    await this.em.flush();
  }

  async deleteUser(userId: string) {
    const user = await this.usersRepository.findOneById(userId);
    if (user === null) throw new NotFoundException();
    if (user.isActive())
      throw new ConflictException('User must be disabled before removal');
    await this.em.remove(user).flush();
  }
}
