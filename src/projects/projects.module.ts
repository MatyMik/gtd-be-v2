import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Project } from './entities/project.entity';
import { NextActionsService } from './next-actions.service';
import { NextAction } from '../next-actions/entities/next-action.entity';
import { Topic } from '../topics/entities/topic.entity';
import { TopicsService } from '../topics/topics.service';

@Module({
  imports: [MikroOrmModule.forFeature([NextAction, Topic, Project])],
  controllers: [ProjectsController],
  providers: [ProjectsService, TopicsService, NextActionsService],
  exports: [ProjectsService, TopicsService, NextActionsService],
})
export class ProjectsModule {}
