import { Property } from '@mikro-orm/core';

export abstract class TimestampedEntity {
  @Property({ type: 'timestamptz' })
  readonly createdAt: Date = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  readonly updatedAt: Date = new Date();
}
