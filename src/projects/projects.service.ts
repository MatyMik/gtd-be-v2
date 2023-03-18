import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Project } from './project.entity';
import { Topic } from '../topics/topic.entity';
import { CreateProjectDto } from './DTOs/create-project.dto';
import { UpdateProjectDto } from './DTOs/update-project.dto';

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
    userId: number,
  ): Promise<Partial<Project>> {
    const newProject = new Project();
    newProject.name = project.name;
    newProject.deadline = project.deadline;
    newProject.active = project.active;
    newProject.done = project.done;
    newProject.topic = topic;
    newProject.userId = userId;
    newProject.tags = project.tags;
    await this.projectsRepository.persistAndFlush(newProject);
    return newProject;
  }

  async findById(id, userId): Promise<Project> {
    return await this.projectsRepository.findOne({ id, userId });
  }

  async deleteProject(id: number) {
    return await this.projectsRepository.removeAndFlush({ id });
  }

  async updateProject(project: Project, updateProjectData: UpdateProjectDto) {
    project.name = updateProjectData.name || project.name;
    project.deadline = updateProjectData.deadline || project.deadline;
    project.tags = updateProjectData.tags || project.tags;
    project.active =
      updateProjectData.active !== undefined
        ? updateProjectData.active
        : project.active;
    project.done =
      updateProjectData.done !== undefined
        ? updateProjectData.done
        : project.done;
    await this.projectsRepository.persistAndFlush(project);
    return project;
  }
}
