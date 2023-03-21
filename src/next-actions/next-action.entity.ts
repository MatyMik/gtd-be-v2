import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Project } from '../projects/project.entity';
import { Tag } from '../tags/tag.entity';

@Entity()
export class NextAction {
  @PrimaryKey()
  id: number;

  @Property({ nullable: false })
  name: string;

  @Property({ nullable: true })
  deadline: Date;

  @ManyToMany()
  tags = new Collection<Tag>(this);
  @Property({ default: false })
  done: boolean;
  @Property({ nullable: true })
  description: string;
  @ManyToOne()
  project: Project;
  @Property({ nullable: false })
  userId: number;
  @Property({ nullable: false })
  createdAt: Date = new Date();
}
