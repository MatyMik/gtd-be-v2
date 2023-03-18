import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Tag } from './tag.entity';

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

  async createTags(userId: number, tags: { name: string; color: string }[]) {
    for (const tag of tags) {
      const newTag = await this.createTag(userId, tag.name, tag.color);
      this.tagsRepository.persist(newTag);
    }
    return await this.tagsRepository.flush();
  }
}
