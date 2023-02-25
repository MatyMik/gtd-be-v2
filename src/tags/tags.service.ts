import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository?: EntityRepository<Tag>,
  ) {}

  async findAllForUser(userId: number) {
    return await this.tagsRepository.find({ userId });
  }

  async createTag(userId: number, name: string, color: string) {
    const tag = new Tag();
    tag.name = name;
    tag.color = color;
    tag.userId = userId;
    await this.tagsRepository.persistAndFlush(tag);
    return tag;
  }
}
