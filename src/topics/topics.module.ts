import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Topic } from './entities/topic.entity';
import { Project } from '../projects/entities/project.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Topic, Project])],
  providers: [TopicsService],
})
export class TopicsModule {}
