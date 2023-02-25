import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Project } from './project.entity';

@Entity()
export class NextAction {
  @PrimaryKey()
  id: number;

  @Property({ hidden: true, nullable: false })
  name: string;

  @Property({ hidden: true, nullable: true })
  deadline: number;

  @Property({ hidden: true, nullable: true })
  tags;

  @ManyToOne() // plain decorator is enough, type will be sniffer via reflection!
  project: Project;
}
