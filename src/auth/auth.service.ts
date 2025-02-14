import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersAuthService } from '../users/users-auth.service';
import { Session } from './domain/session.entity';
import { LoginData } from './schemas/login-data.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersAuthService: UsersAuthService,
    private readonly em: EntityManager,
  ) {}

  async login(data: LoginData) {
    if (data.password.length > 128) throw new UnauthorizedException();
    const user = await this.usersAuthService.findByUsername(data.username);
    if (user === null) throw new UnauthorizedException();
    const isValidPassword = await user.verifyPassword(data.password);
    if (!isValidPassword) throw new UnauthorizedException();
    const session = new Session({ user });
    await this.em.persist(session).flush();
    return session;
  }

  async getCurrentUser(session: Session) {
    return session.user.loadOrFail();
  }

  async logout(session: Session) {
    await this.em.remove(session).flush();
  }
}
