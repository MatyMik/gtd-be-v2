import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Topic } from '../topics/topic.entity';

@Entity()
export class Project {
  @PrimaryKey()
  id: number;

  @Property({ nullable: false })
  name: string;

  @Property({ nullable: true })
  deadline: number;

  @Property({ nullable: true })
  tags: number[];

  @Property({ default: true })
  active: boolean;

  @Property({ default: false })
  done: boolean;

  @ManyToOne() // plain decorator is enough, type will be sniffer via reflection!
  topic: Topic;

  @Property({ hidden: true, nullable: false })
  userId: number;
}
