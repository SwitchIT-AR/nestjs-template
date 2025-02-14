import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from './domain/user.entity';

@Injectable()
export class UsersAuthService {
  constructor(private readonly em: EntityManager) {}

  async findByUsername(username: string) {
    return this.em.findOne(User, { username });
  }
}
