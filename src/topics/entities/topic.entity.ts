import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Topic {
  @PrimaryKey()
  id: number;

  @Property({ hidden: true, nullable: false })
  name: string;

  userId: number;
}
