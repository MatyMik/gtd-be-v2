import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Project } from '../projects/project.entity';

@Entity()
export class NextAction {
  @PrimaryKey()
  id: number;

  @Property({ nullable: false })
  name: string;

  @Property({ nullable: true })
  deadline: Date;

  @Property({ nullable: true })
  tags: number[];

  @Property({ default: false })
  done: boolean;

  @Property({ nullable: true })
  description: string;

  @ManyToOne() // plain decorator is enough, type will be sniffer via reflection!
  project: Project;

  @Property({ nullable: false })
  userId: number;

  @Property({ nullable: false })
  createdAt: Date = new Date();
}
