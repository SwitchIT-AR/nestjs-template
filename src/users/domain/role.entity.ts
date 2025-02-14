import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import * as uuid from 'uuid';
import { TimestampedEntity } from '../../common/timestamped-entity.entity';

@Entity({ tableName: 'roles' })
export class Role extends TimestampedEntity {
  @PrimaryKey({ type: 'uuid' })
  readonly id: string = uuid.v7();

  @Property({ type: 'text' })
  readonly codename: string;

  @Property({ type: 'text' })
  readonly displayName: string;

  constructor(props: RoleProps) {
    super();
    this.codename = props.codename;
    this.displayName = props.displayName;
  }
}

export interface RoleProps {
  readonly codename: string;
  readonly displayName: string;
}
