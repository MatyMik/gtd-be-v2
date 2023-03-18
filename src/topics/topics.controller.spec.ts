import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';
import { mockTopics } from '../test/mock-topics';
import { Topic } from './topic.entity';

describe('TopicsController', () => {
  let controller: TopicsController;
  let topicsService: TopicsService;

  beforeEach(() => {
    topicsService = new TopicsService();
    controller = new TopicsController(topicsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('returns the topics for a user', async () => {
    jest
      .spyOn(topicsService, 'findAllForUser')
      .mockImplementation(async () => mockTopics as Topic[]);
    await expect(controller.getTopics({ userId: 1 })).resolves.toEqual(
      mockTopics,
    );
  });
  describe('create topic', () => {
    it('throws an error if the topic name is already used', async () => {
      jest
        .spyOn(topicsService, 'findAllForUser')
        .mockImplementation(async () => mockTopics as Topic[]);
      await expect(
        controller.createTopic({ userId: 1 }, { name: 'test topic' }),
      ).rejects.toThrow('Topic name already used');
    });
    it('creates a topic with good inputs', async () => {
      jest
        .spyOn(topicsService, 'findAllForUser')
        .mockImplementation(async () => mockTopics as Topic[]);
      jest
        .spyOn(topicsService, 'createTopic')
        .mockImplementation(async () => ({ name: 'test topic 3' } as Topic));
      await expect(
        controller.createTopic({ userId: 1 }, { name: 'test topic 3' }),
      ).resolves.toEqual({ name: 'test topic 3' });
    });
  });
  describe('delete topic', () => {
    it('throws an error if the topic does not exist or belong to the user', async () => {
      jest
        .spyOn(topicsService, 'findOne')
        .mockImplementation(async () => undefined as Topic);
      await expect(controller.deleteTopic({ userId: 1 }, 1)).rejects.toThrow(
        'Topic does not exist',
      );
    });
  });
});
