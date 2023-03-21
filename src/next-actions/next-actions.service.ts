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
      { populate: ['tags'], orderBy: { createdAt: QueryOrder.ASC } },
    );
  }

  async createNextAction(
    nextAction: CreateNextActionDto,
  ): Promise<Partial<NextAction>> {
    const newNextAction = this.nextActionsRepository.create(nextAction);
    await this.nextActionsRepository.persistAndFlush(newNextAction);
    return newNextAction;
  }

  async findById(id, userId): Promise<NextAction> {
    return await this.nextActionsRepository.findOne(
      { id, userId },
      { populate: ['tags'] },
    );
  }

  async deleteNextAction(id: number) {
    return await this.nextActionsRepository.removeAndFlush({ id });
  }

  async updateNextAction(
    nextActionToUpdate: NextAction,
    newNextAction: UpdateNextActionDto,
  ) {
    return await this.nextActionsRepository.upsert({
      ...nextActionToUpdate,
      ...newNextAction,
    });
  }

  async findAllForUser(userId: number) {
    return await this.nextActionsRepository.find(
      { userId, done: false },
      { populate: ['tags'], orderBy: { deadline: QueryOrder.DESC } },
    );
  }
}
