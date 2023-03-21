import { Module } from '@nestjs/common';
import { NextActionsController } from './next-actions.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { NextAction } from './next-action.entity';
import { NextActionsService } from './next-actions.service';
import { ProjectsService } from '../projects/projects.service';
import { Project } from '../projects/project.entity';
import { Tag } from '../tags/tag.entity';
import { TagsService } from '../tags/tags.service';

@Module({
  imports: [MikroOrmModule.forFeature([NextAction, Project, Tag])],
  providers: [NextActionsService, ProjectsService, TagsService],
  exports: [NextActionsService],
  controllers: [NextActionsController],
})
export class NextActionsModule {}
