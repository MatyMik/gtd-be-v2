import {
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { MyDay } from './my-day.entity';
import { ToDo } from './to-do-entry.entity';

@Entity()
export class Hour {
  @PrimaryKey()
  id: number;

  @Property({ nullable: false })
  hour: number;

  @ManyToOne()
  myDay: MyDay;

  @OneToMany(() => ToDo, (toDo) => toDo.hour)
  toDos: ToDo[];

  @OneToMany(() => ToDo, (toDo) => toDo.hour)
  breakActions: ToDo[];
}
