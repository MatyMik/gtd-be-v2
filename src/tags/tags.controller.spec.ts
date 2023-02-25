import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { mockTags } from '../test/mock-tags';

describe('TagsController', () => {
  let controller: TagsController;
  let tagsService: TagsService;

  beforeEach(() => {
    tagsService = new TagsService();
    controller = new TagsController(tagsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('get tags', () => {
    it('returns the tags', async () => {
      jest
        .spyOn(tagsService, 'findAllForUser')
        .mockImplementation(async () => mockTags);
      await expect(controller.getTags({ id: 1 })).resolves.toEqual(mockTags);
    });
  });
  describe('create tag', () => {
    it('throws when the tag name is already used', async () => {
      jest
        .spyOn(tagsService, 'findAllForUser')
        .mockImplementation(async () => mockTags);
      await expect(
        controller.createTag(
          { id: 1 },
          { name: mockTags[0].name, color: mockTags[0].color },
        ),
      ).rejects.toThrow('Tag already exists');
    });
    it('returns the created tag', async () => {
      jest
        .spyOn(tagsService, 'findAllForUser')
        .mockImplementation(async () => mockTags);
      jest.spyOn(tagsService, 'createTag').mockImplementation(async () => ({
        name: 'new tag',
        color: '#000000',
        id: 3,
        userId: 1,
      }));
      await expect(
        controller.createTag({ id: 1 }, { name: 'new tag', color: '#000000' }),
      ).resolves.toEqual({
        name: 'new tag',
        color: '#000000',
        id: 3,
        userId: 1,
      });
    });
  });
});
