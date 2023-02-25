import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Project } from './entities/project.entity';
import { Topic } from '../topics/entities/topic.entity';
import { User } from '../authentication/entities/user.entity';
import { CreateProjectDto } from './DTOs/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository?: EntityRepository<Project>,
  ) {}

  async findAllForTopics(topic: Topic[]) {
    return await this.projectsRepository.find({ topic });
  }

  async findAllForUser(userId: number) {
    return await this.projectsRepository.find({ userId });
  }

  async createProject(
    project: CreateProjectDto,
    topic: Topic,
    user: User,
  ): Promise<Partial<Project>> {
    const newProject = new Project();
    newProject.name = project.name;
    newProject.deadline = project.deadline;
    newProject.active = project.active;
    newProject.done = project.done;
    newProject.topic = topic;
    newProject.userId = user.id;
    await this.projectsRepository.persistAndFlush(newProject);
    return newProject;
  }

  async findById(id, user) {
    return await this.projectsRepository.find({ id, userId: user.id });
  }

  async deleteProject(id: number) {
    return await this.projectsRepository.removeAndFlush({ id });
  }
}
