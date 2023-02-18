import { IsEmail } from 'class-validator';

import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  id: number;

  @Property({ hidden: true })
  @IsEmail()
  email: string;

  @Property({ hidden: true })
  password: string;
}
