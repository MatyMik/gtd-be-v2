import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { ProjectsModule } from './projects/projects.module';
import { NextActionsService } from './next-actions/next-actions.service';
import { NextActionsModule } from './next-actions/next-actions.module';
import { TopicsController } from './topics/topics.controller';
import { TopicsModule } from './topics/topics.module';
import { TagsService } from './tags/tags.service';
import { TagsController } from './tags/tags.controller';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    AuthenticationModule,
    MikroOrmModule.forRoot(),
    ProjectsModule,
    NextActionsModule,
    TopicsModule,
    TagsModule,
  ],
  controllers: [AppController, TopicsController, TagsController],
  providers: [AppService, NextActionsService, TagsService],
})
export class AppModule {}
