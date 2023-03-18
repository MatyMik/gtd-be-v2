import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Topic } from './topic.entity';
import { CreateTopicDto } from './DTOs/create-topic.dto';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private topicsRepository?: EntityRepository<Topic>,
  ) {}

  async findAllForUser(userId: number) {
    return await this.topicsRepository.find(
      { userId },
      {
        fields: ['name', 'id'],
      },
    );
  }

  async findAll(topicIds: number[]) {
    return await this.topicsRepository.find({ id: topicIds });
  }

  async createTopic(userId: number, topic: CreateTopicDto) {
    const newTopic = new Topic();
    newTopic.name = topic.name;
    newTopic.userId = userId;
    await this.topicsRepository.persistAndFlush(newTopic);
    return newTopic;
  }

  async findOne(id: number, userId: number) {
    return await this.topicsRepository.findOne({ id, userId });
  }

  async deleteTopic(topic: Topic) {
    await this.topicsRepository.removeAndFlush(topic);
  }
}
