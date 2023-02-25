import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { TopicsService } from '../topics/topics.service';
import { User } from '../decorators/user.decorator';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './DTOs/create-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(
    private topicService: TopicsService,
    private projectsService: ProjectsService,
  ) {}

  @Get('')
  async getProjects(@User() user, @Query('topicId') topicIds: number[]) {
    if (!topicIds.length) {
      return await this.projectsService.findAllForUser(user);
    }
    const topics = await this.topicService.findAll(topicIds);
    if (topics.length !== topicIds.length) {
      throw new Error('Certain topics do not exist');
    }
    if (!topics.every((topic) => topic.userId === user.id)) {
      throw new Error('Certain topics do not belong to the user');
    }
    return await this.projectsService.findAllForTopics(topics);
  }

  @Post('')
  async createProject(@User() user, @Body() project: CreateProjectDto) {
    const topic = await this.topicService.findOne(project.topicId, user);
    if (!topic) {
      throw new Error('Topic does not exist');
    }
    const projectsOfTopic = await this.projectsService.findAllForTopics([
      topic,
    ]);
    if (projectsOfTopic.some((proj) => proj.name === project.name)) {
      throw new Error('Project name already used');
    }
    return await this.projectsService.createProject(project, topic, user);
  }

  @Delete(':id')
  async deleteProject(@User() user, @Param('id') projectId: number) {
    const project = await this.projectsService.findById(projectId, user);
    if (!project) throw new Error('Project not found');
    await this.projectsService.deleteProject(projectId);
  }
}
