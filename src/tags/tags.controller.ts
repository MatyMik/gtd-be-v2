import { Body, Controller, Get, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { User } from '../decorators/user.decorator';
import { CreateTagDto } from './DTOs/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  async getTags(@User() user) {
    return await this.tagsService.findAllForUser(user.id);
  }

  @Post()
  async createTag(@User() user, @Body() tag: CreateTagDto) {
    const tags = await this.tagsService.findAllForUser(user.id);
    if (tags.some((t) => t.name === tag.name)) {
      throw new Error('Tag already exists');
    }
    return await this.tagsService.createTag(user.id, tag.name, tag.color);
  }
}
