import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Tag {
  @PrimaryKey()
  id: number;

  @Property({ nullable: false })
  name: string;

  @Property({ nullable: true })
  color: string;

  @Property({ hidden: true, nullable: false })
  userId: number;
}
