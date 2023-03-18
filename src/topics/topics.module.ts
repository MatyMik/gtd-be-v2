import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Topic } from './topic.entity';
import { Project } from '../projects/project.entity';
import { ProjectsService } from '../projects/projects.service';
import { TopicsController } from './topics.controller';

@Module({
  imports: [MikroOrmModule.forFeature([Topic, Project])],
  providers: [TopicsService, ProjectsService],
  controllers: [TopicsController],
})
export class TopicsModule {}
