import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TopicsService } from '../topics/topics.service';
import { NextActionsService } from './next-actions.service';
import { Topic } from '../topics/topic.entity';
import { mockProjects } from '../test/mock-projects';

const mockTopics = [
  { id: 1, name: 'test topic', userId: 1 },
  { id: 2, name: 'test topic 2', userId: 1 },
];

const mockTopicsWithMultipleUsers = [
  { id: 1, name: 'test topic', userId: 1 },
  { id: 2, name: 'test topic 2', userId: 2 },
];

describe('GtdProjectsController', () => {
  let controller: ProjectsController;
  let projectsService: ProjectsService;
  let topicsService: TopicsService;
  let nextActionsService: NextActionsService;

  beforeEach(() => {
    projectsService = new ProjectsService();
    topicsService = new TopicsService();
    nextActionsService = new NextActionsService();
    controller = new ProjectsController(topicsService, projectsService);
  });
  describe('get all Projects for topics', () => {
    it('throws when the topic with topicId does not exist', async () => {
      jest.spyOn(topicsService, 'findAll').mockImplementation(async () => []);
      await expect(controller.getProjects({ id: 1 }, [1, 2])).rejects.toThrow(
        'Certain topics do not exist',
      );
    });
    it('throws when the topicId does not belong to the user', async () => {
      jest
        .spyOn(topicsService, 'findAll')
        .mockImplementation(async () => mockTopicsWithMultipleUsers as Topic[]);
      await expect(controller.getProjects({ id: 1 }, [1, 2])).rejects.toThrow(
        'Certain topics do not belong to the user',
      );
    });
    it('returns all the projects for a user if no topicIds are provided', async () => {
      jest
        .spyOn(projectsService, 'findAllForUser')
        .mockImplementation(async () => mockProjects);
      await expect(controller.getProjects({ id: 1 }, [])).resolves.toEqual(
        mockProjects,
      );
    });
    it('returns the projects for given topic', async () => {
      jest
        .spyOn(topicsService, 'findAll')
        .mockImplementation(async () => [mockTopics[0]]);
      jest
        .spyOn(projectsService, 'findAllForTopics')
        .mockImplementation(async () => mockProjects);
      await expect(controller.getProjects({ id: 1 }, [1])).resolves.toEqual(
        mockProjects,
      );
    });
  });
  describe('create a project', () => {
    it('throws when the topic with topicId does not exist', async () => {
      jest
        .spyOn(topicsService, 'findOne')
        .mockImplementation(async () => undefined);
      await expect(
        controller.createProject(
          { id: 1 },
          { name: 'test project', topicId: 1 },
        ),
      ).rejects.toThrow('Topic does not exist');
    });
    it('throws an error if the project with the given name in the topic already exists', async () => {
      jest
        .spyOn(topicsService, 'findOne')
        .mockImplementation(async () => mockTopics[0] as Topic);
      jest
        .spyOn(projectsService, 'findAllForTopics')
        .mockImplementation(async () => mockProjects);
      await expect(
        controller.createProject(
          { id: 1 },
          { name: mockProjects[0].name, topicId: 1 },
        ),
      ).rejects.toThrow('Project name already used');
    });
    it('creates the project', async () => {
      jest
        .spyOn(topicsService, 'findOne')
        .mockImplementation(async () => mockTopics[0] as Topic);
      jest
        .spyOn(projectsService, 'findAllForTopics')
        .mockImplementation(async () => mockProjects);
      jest
        .spyOn(projectsService, 'createProject')
        .mockImplementation(async () => ({ id: 1, name: 'test project' }));
      await expect(
        controller.createProject(
          { id: 1 },
          { name: 'test project', topicId: 1 },
        ),
      ).resolves.toEqual({ id: 1, name: 'test project' });
    });
  });
});
