import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { User } from '../decorators/user.decorator';
import { CreateTopicDto } from './DTOs/create-topic.dto';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  async getTopics(@User() userId) {
    return { topics: await this.topicsService.findAllForUser(userId) };
  }

  @Post()
  async createTopic(@User() userId, @Body() topic: CreateTopicDto) {
    const topics = await this.topicsService.findAllForUser(userId);
    if (topics.some((t) => t.name === topic.name)) {
      throw new Error('Topic name already used');
    }
    return await this.topicsService.createTopic(userId, topic);
  }

  @Delete(':id')
  async deleteTopic(@User() userId, @Param('id') id: number) {
    const topic = await this.topicsService.findOne(id, userId);
    if (!topic) {
      throw new Error('Topic does not exist');
    }
    await this.topicsService.deleteTopic(topic);
    return { message: 'Topic deleted' };
  }
}
