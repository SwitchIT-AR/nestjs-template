import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersAuthService } from '../users/users-auth.service';
import { Session } from './domain/session.entity';
import { LoginData } from './schemas/login-data.schema';

@Injectable()
export class AuthService {
  private readonly sessionMaxAge: number;

  constructor(
    private readonly usersAuthService: UsersAuthService,
    private readonly em: EntityManager,
    configService: ConfigService,
  ) {
    this.sessionMaxAge = Number(configService.get('SESSION_MAX_AGE'));
  }

  async login(data: LoginData) {
    if (data.password.length > 128) throw new UnauthorizedException();
    const user = await this.usersAuthService.findByUsername(data.username);
    if (user === null) throw new UnauthorizedException();
    const isValidPassword = await user.verifyPassword(data.password);
    if (!isValidPassword) throw new UnauthorizedException();
    const maxAge = (this.sessionMaxAge ?? 8 * 3600) * 1000;
    const expireAt = new Date(Date.now() + maxAge);
    const session = new Session({ user, expireAt });
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
