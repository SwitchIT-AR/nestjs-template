import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import * as argon2 from 'argon2';
import * as uuid from 'uuid';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey({ type: 'uuid' })
  readonly id: string = uuid.v7();

  @Property({ type: 'text', unique: true })
  username: string;

  @Property({ type: 'text', hidden: true })
  passwordHash: string;

  private constructor(props: UserProps) {
    this.username = props.username;
    this.passwordHash = props.passwordHash;
  }

  static async create(props: NewUserProps) {
    return new User({
      username: props.username,
      passwordHash: await argon2.hash(props.password),
    });
  }

  async verifyPassword(password: string) {
    return argon2.verify(this.passwordHash, password);
  }

  async setUsername(username: string) {
    this.username = username;
  }

  async setPassword(password: string) {
    this.passwordHash = await argon2.hash(password);
  }
}

interface NewUserProps {
  readonly username: string;
  readonly password: string;
}

interface UserProps {
  readonly username: string;
  readonly passwordHash: string;
}
