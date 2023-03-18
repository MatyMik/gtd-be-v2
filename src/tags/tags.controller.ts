import { Body, Controller, Get, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { User } from '../decorators/user.decorator';
import { CreateTagDto } from './DTOs/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  async getTags(@User() userId) {
    return await this.tagsService.findAllForUser(userId);
  }

  @Post()
  async createTag(@User() userId, @Body() tag: CreateTagDto) {
    const tags = await this.tagsService.findAllForUser(userId);
    if (tags.some((t) => t.name === tag.name)) {
      throw new Error('Tag already exists');
    }
    return await this.tagsService.createTag(userId, tag.name, tag.color);
  }

  @Post('bulk')
  async createTags(@User() userId, @Body() tags: CreateTagDto[]) {
    const existingTags = await this.tagsService.findAllForUser(userId);
    const tagsToCreate = [];
    for (const tag of tags) {
      if (existingTags.some((t) => t.name === tag.name)) {
      } else {
        tagsToCreate.push(tag);
      }
    }
    return await this.tagsService.createTags(userId, tagsToCreate);
  }
}
