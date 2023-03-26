import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { ProjectsModule } from './projects/projects.module';
import { NextActionsModule } from './next-actions/next-actions.module';
import { TopicsModule } from './topics/topics.module';
import { TagsModule } from './tags/tags.module';
import { MyDayModule } from './my-day/my-day.module';

@Module({
  imports: [
    AuthenticationModule,
    ProjectsModule,
    NextActionsModule,
    TopicsModule,
    TagsModule,
    MikroOrmModule.forRoot(),
    MyDayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
