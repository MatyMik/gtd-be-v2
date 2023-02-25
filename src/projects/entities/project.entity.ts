import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Topic } from '../../topics/entities/topic.entity';

@Entity()
export class Project {
  @PrimaryKey()
  id: number;

  @Property({ hidden: true, nullable: false })
  name: string;

  @Property({ hidden: true })
  deadline: number;

  @Property({ hidden: true, default: true })
  active: boolean;

  @Property({ hidden: true, default: false })
  done: boolean;

  @ManyToOne() // plain decorator is enough, type will be sniffer via reflection!
  topic: Topic;

  @Property({ hidden: true, default: false, nullable: false })
  userId: number;
}
