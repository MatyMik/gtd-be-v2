import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class MyDay {
  @PrimaryKey()
  id: number;

  @Property({ nullable: false })
  date: Date;
}
