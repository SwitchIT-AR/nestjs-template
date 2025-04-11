import {
  EntityManager,
  UniqueConstraintViolationException,
} from '@mikro-orm/postgresql';
import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaginationOptions } from '../common/pagination-options.schema';
import { User } from './domain/user.entity';
import { NewPassword } from './schemas/new-password.schema';
import { NewUser } from './schemas/new-user.schema';
import { NewUsername } from './schemas/new-username.schema';

@Injectable()
export class UsersService implements OnApplicationBootstrap {
  private readonly logger = new Logger(UsersService.name);
  private readonly initialUser?: string;
  private readonly initialPassword?: string;

  constructor(
    private readonly em: EntityManager,
    configService: ConfigService,
  ) {
    this.initialUser = configService.get<string>('INITIAL_USER');
    this.initialPassword = configService.get<string>('INITIAL_PASSWORD');
  }

  async onApplicationBootstrap() {
    const em = this.em.fork();
    const count = await em.count(User);
    if (count > 0) return;

    const username = this.initialUser ?? 'admin';
    const password = this.initialPassword;
    if (!password)
      return this.logger.warn(
        'No users in database; please set INITIAL_PASSWORD to add an initial user',
      );

    const user = await User.create({ username, password });
    await em.persist(user).flush();
    this.logger.log('No users in database; inserted initial user');
  }

  async createUser(data: NewUser) {
    const user = await User.create(data);
    try {
      await this.em.persist(user).flush();
    } catch (err: unknown) {
      if (err instanceof UniqueConstraintViolationException)
        throw new ConflictException('Username already in use');
      throw err;
    }
  }

  async listUsers(opts: PaginationOptions) {
    const [items, total] = await this.em.findAndCount(
      User,
      {},
      { orderBy: { username: 'asc' }, offset: opts.offset, limit: opts.limit },
    );
    return { total, items };
  }

  async changeUsername(userId: string, data: NewUsername) {
    const user = await this.em.findOne(User, { id: userId });
    if (user === null) throw new NotFoundException();
    await user.setUsername(data.username);
    try {
      await this.em.flush();
    } catch (err) {
      if (err instanceof UniqueConstraintViolationException)
        throw new ConflictException('Username already in use');
      throw err;
    }
  }

  async changePassword(userId: string, data: NewPassword) {
    const user = await this.em.findOne(User, { id: userId });
    if (user === null) throw new NotFoundException();
    await user.setPassword(data.password);
    await this.em.flush();
  }

  async deleteUser(userId: string) {
    const user = await this.em.findOne(User, { id: userId });
    if (user === null) throw new NotFoundException();
    await this.em.remove(user).flush();
  }
}
