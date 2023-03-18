import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Project } from './project.entity';
import { NextAction } from '../next-actions/next-action.entity';
import { Topic } from '../topics/topic.entity';
import { TopicsService } from '../topics/topics.service';

@Module({
  imports: [MikroOrmModule.forFeature([NextAction, Topic, Project])],
  controllers: [ProjectsController],
  providers: [ProjectsService, TopicsService],
  exports: [ProjectsService, TopicsService],
})
export class ProjectsModule {}
