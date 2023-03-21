import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { User } from '../decorators/user.decorator';
import { NextActionsService } from './next-actions.service';
import { CreateNextActionDto } from './DTOs/create-next-action.dto';
import { ProjectsService } from '../projects/projects.service';
import { UpdateNextActionDto } from './DTOs/update-next-action.dto';
import { TagsService } from '../tags/tags.service';

@Controller('next-actions')
export class NextActionsController {
  constructor(
    private nextActionsService: NextActionsService,
    private projectsService: ProjectsService,
    private tagsService: TagsService,
  ) {}

  @Post('')
  async createNextAction(
    @User() userId,
    @Body() nextAction: CreateNextActionDto,
  ) {
    const project = await this.projectsService.findById(
      nextAction.project,
      userId,
    );
    if (!project) {
      throw new Error('Project does not exist');
    }
    const nextActionsOfProject =
      await this.nextActionsService.findAllForProject(project);
    if (nextActionsOfProject.some((proj) => proj.name === project.name)) {
      throw new Error('Next Action already used');
    }
    return await this.nextActionsService.createNextAction(nextAction);
  }

  @Get()
  async getNextActions(@User() userId, @Query('projectId') projectId: number) {
    if (!projectId) {
      return await this.nextActionsService.findAllForUser(userId);
    }
    const project = await this.projectsService.findById(projectId, userId);
    if (!project) throw new Error('Project does not exist');
    const nAs = await this.nextActionsService.findAllForProject(project);
    console.log(nAs);
    return nAs;
  }

  @Put(':id')
  async updateNextAction(
    @User() userId,
    @Body() nextAction: UpdateNextActionDto,
    @Param('id') nextActionId: number,
  ) {
    const nextActionToUpdate = await this.nextActionsService.findById(
      nextActionId,
      userId,
    );
    if (!nextActionToUpdate) throw new Error('Next Action does not exist');
    const tags = await this.tagsService.findTagsByIds(nextAction.tags, userId);
    return await this.nextActionsService.updateNextAction(
      nextActionToUpdate,
      nextAction,
    );
  }
}
