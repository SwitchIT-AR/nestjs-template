import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(private readonly em: EntityManager) {}

  async findOneById(id: string) {
    return this.em.findOne(User, { id });
  }
}
