import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { NextAction } from '../next-actions/next-action.entity';

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

  @ManyToMany(() => NextAction, (nextAction) => nextAction.tags)
  books = new Collection<NextAction>(this);
}
