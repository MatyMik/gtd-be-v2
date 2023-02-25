import { Test, TestingModule } from '@nestjs/testing';
import { NextActionsController } from './next-actions.controller';

describe('NextActionsController', () => {
  let controller: NextActionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NextActionsController],
    }).compile();

    controller = module.get<NextActionsController>(NextActionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
