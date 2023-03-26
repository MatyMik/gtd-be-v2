import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Hour } from './hour.entity';

@Entity()
export class ToDo {
  @PrimaryKey()
  id: number;

  @ManyToOne()
  hour: Hour;

  @Property({ nullable: true })
  description: string;

  @Property({ nullable: true })
  nextAction: number;
}
