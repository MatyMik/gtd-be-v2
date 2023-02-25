import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { User } from '../decorators/user.decorator';
import { CreateTopicDto } from './DTOs/create-topic.dto';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  async getTopics(@User() user) {
    return await this.topicsService.findAllForUser(user);
  }

  @Post()
  async createTopic(@User() user, @Body() topic: CreateTopicDto) {
    const topics = await this.topicsService.findAllForUser(user);
    if (topics.some((t) => t.name === topic.name)) {
      throw new Error('Topic name already used');
    }
    return await this.topicsService.createTopic(user, topic);
  }

  @Delete(':id')
  async deleteTopic(@User() user, @Param('id') id: number) {
    const topic = await this.topicsService.findOne(id, user);
    if (!topic) {
      throw new Error('Topic does not exist');
    }
    await this.topicsService.deleteTopic(topic);
    return { message: 'Topic deleted' };
  }
}
