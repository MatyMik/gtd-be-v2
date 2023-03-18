import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Topic {
  @PrimaryKey()
  id: number;

  @Property({ nullable: false })
  name: string;

  @Property({ nullable: false })
  userId: number;
}
