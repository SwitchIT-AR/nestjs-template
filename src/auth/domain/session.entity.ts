import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  ref,
  Ref,
} from '@mikro-orm/core';
import * as uuid from 'uuid';
import { TimestampedEntity } from '../../common/timestamped-entity.entity';
import { User } from '../../users/domain/user.entity';

@Entity({ tableName: 'sessions' })
export class Session extends TimestampedEntity {
  @PrimaryKey({ type: 'uuid' })
  readonly id: string = uuid.v7();

  @ManyToOne(() => User, { ref: true })
  readonly user: Ref<User>;

  @Property({ type: 'timestamptz' })
  readonly expireAt: Date;

  constructor(props: SessionProps) {
    super();
    this.user = ref(props.user);
    this.expireAt = props.expireAt;
  }
}

interface SessionProps {
  readonly user: User;
  readonly expireAt: Date;
}
