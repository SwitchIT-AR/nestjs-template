import { PaginationOptions } from '@/common/pagination-options.schema';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(private readonly em: EntityManager) {}

  async findAll(opts: PaginationOptions) {
    const total = await this.em.count(User);
    const items = await this.em.findAll(User, {
      offset: (opts.page - 1) * opts.limit,
      limit: opts.limit,
    });
    return { total, items };
  }

  async findOneById(id: string) {
    return this.em.findOne(User, { id });
  }
}
