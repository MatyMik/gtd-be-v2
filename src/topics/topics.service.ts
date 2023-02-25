import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Topic } from './entities/topic.entity';
import { User } from '../authentication/entities/user.entity';
import { CreateTopicDto } from './DTOs/create-topic.dto';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private topicsRepository?: EntityRepository<Topic>,
  ) {}

  async findAllForUser(user: User) {
    return await this.topicsRepository.find(
      { userId: user.id },
      {
        fields: ['name', 'id'],
      },
    );
  }

  async findAll(topicIds: number[]) {
    return await this.topicsRepository.find(
      { id: topicIds },
      {
        fields: ['name', 'id'],
      },
    );
  }

  async createTopic(user: User, topic: CreateTopicDto) {
    const newTopic = new Topic();
    newTopic.name = topic.name;
    newTopic.userId = user.id;
    await this.topicsRepository.persistAndFlush(newTopic);
    return newTopic;
  }

  async findOne(id: number, user) {
    return await this.topicsRepository.findOne({ id, userId: user.id });
  }

  async deleteTopic(topic: Topic) {
    await this.topicsRepository.removeAndFlush(topic);
  }
}
