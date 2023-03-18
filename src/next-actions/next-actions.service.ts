import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { NextAction } from './next-action.entity';
import { CreateNextActionDto } from './DTOs/create-next-action.dto';
import { Project } from '../projects/project.entity';
import { UpdateNextActionDto } from './DTOs/update-next-action.dto';
import { QueryOrder } from '@mikro-orm/core';

@Injectable()
export class NextActionsService {
  constructor(
    @InjectRepository(NextAction)
    private nextActionsRepository?: EntityRepository<NextAction>,
  ) {}

  async findAllForProject(project: Project) {
    return await this.nextActionsRepository.find(
      { project, done: false },
      { orderBy: { createdAt: QueryOrder.ASC } },
    );
  }

  async createNextAction(
    nextAction: CreateNextActionDto,
    project: Project,
    userId: number,
  ): Promise<Partial<NextAction>> {
    const newNextAction = new NextAction();
    newNextAction.name = nextAction.name;
    newNextAction.deadline = new Date(nextAction.deadline);
    newNextAction.done = nextAction.done;
    newNextAction.project = project;
    newNextAction.userId = userId;
    newNextAction.description = nextAction.description;
    newNextAction.tags = nextAction.tags;
    await this.nextActionsRepository.persistAndFlush(newNextAction);
    return newNextAction;
  }

  async findById(id, userId): Promise<NextAction> {
    return await this.nextActionsRepository.findOne({ id, userId });
  }

  async deleteNextAction(id: number) {
    return await this.nextActionsRepository.removeAndFlush({ id });
  }

  async updateNextAction(
    nextActionToUpdate: NextAction,
    newNextAction: UpdateNextActionDto,
  ) {
    nextActionToUpdate.name = newNextAction.name || nextActionToUpdate.name;
    nextActionToUpdate.deadline =
      newNextAction.deadline || nextActionToUpdate.deadline;
    nextActionToUpdate.done =
      newNextAction.done !== undefined
        ? newNextAction.done
        : nextActionToUpdate.done;
    nextActionToUpdate.description =
      newNextAction.description || nextActionToUpdate.description;
    nextActionToUpdate.tags = newNextAction.tags || nextActionToUpdate.tags;
    await this.nextActionsRepository.persistAndFlush(nextActionToUpdate);
    return nextActionToUpdate;
  }

  async findAllForUser(userId: number) {
    return await this.nextActionsRepository.find(
      { userId, done: false },
      { orderBy: { deadline: QueryOrder.DESC } },
    );
  }
}
