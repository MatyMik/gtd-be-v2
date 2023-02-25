import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Tag {
  @PrimaryKey()
  id: number;

  @Property({ hidden: true, nullable: false })
  name: string;

  @Property({ hidden: true, nullable: false })
  color: string;

  @Property({ hidden: true, default: false, nullable: false })
  userId: number;
}
