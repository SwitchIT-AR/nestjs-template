import { MAX_PASSWORD_LENGTH, PasswordService, UsersRepository } from '@/users';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Session } from './entities/session.entity';
import { LoginData } from './schemas/login-data.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordService: PasswordService,
    private readonly em: EntityManager,
  ) {}

  async login(data: LoginData) {
    const user = await this.usersRepository.findOneByUsername(data.username);
    if (
      user === null ||
      user.isDisabled() ||
      data.password.length > MAX_PASSWORD_LENGTH
    )
      throw new UnauthorizedException();

    const isCorrectPassword = await this.passwordService.verify(
      user.passwordHash,
      data.password,
    );
    if (!isCorrectPassword) throw new UnauthorizedException();

    const expireAt = new Date(Date.now() + 8 * 8600 * 1000);
    const session = new Session(user, expireAt);
    await this.em.persist(session).flush();
    return session;
  }
}
